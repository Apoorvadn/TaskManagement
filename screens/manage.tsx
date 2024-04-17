import React, { FC, useEffect, useState } from 'react';
import { Alert, DeviceEventEmitter, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CheckBox from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from "../assets/colors/globalcolors";
import { getData, setData, updateData } from '../service/storeService';
import { Dayjs } from 'dayjs';

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: number;
}

interface ManageProps {
    navigation: any;
    defaultValues: {
        title: string;
        description: string;
    };
    route: {
        params: {
            task: Task;
            isEditing: boolean;
        };
    };
}

const Manage: FC<ManageProps> = ({ navigation, defaultValues, route }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(route?.params?.task?.isCompleted === 0 ? false : true);


    const [title, setTitle] = useState<string>(defaultValues?.title);
    const [description, setDescription] = useState<string>(defaultValues?.description);
    const [date, setDate] = useState<string>('');


    useEffect(() => {
        if (route?.params?.task) {
            setTitle(route?.params?.task.title)
            setDescription(route?.params?.task.description)
            setDate(route?.params?.task.dueDate);
            setIsEditing(route?.params?.isEditing);
        }
    }, [route?.params?.task])

    const SubmitHandler = async () => {
        if (!title || !description || !date) {
            return
        }
        const currentTasks: Task[] = await getData('tasks') || [];
        if (isEditing) {
            const editTaskIndex: number = currentTasks.findIndex((task: Task) => task.id === route?.params?.task?.id)
            if (editTaskIndex !== -1) {
                currentTasks[editTaskIndex].title = title;
                currentTasks[editTaskIndex].description = description;
                currentTasks[editTaskIndex].dueDate = date;
                currentTasks[editTaskIndex].isCompleted = isSelected ? 1 : 0;
                await updateData(currentTasks[editTaskIndex])
                navigation.navigate('Tasks', { didUpdate: true })
            }
        } else if (title && description) {
            const task: Task = {
                id: new Date().getTime(),
                title,
                description,
                dueDate: date,
                isCompleted: isSelected ? 1 : 0,
            };
            await setData('tasks', task);
            navigation.navigate('Tasks', { task })
        }
    }

    function ClearHandler() {
        setTitle('');
        setDate('');
        setDescription('');
    }

    function deleteHandler() {
        Alert.alert('Are you sure you want to delete!', '',
            [
                {
                    text: 'Yes', onPress: () => {
                        DeviceEventEmitter.emit('deleteEvent', { id: route?.params?.task?.id });
                        navigation.navigate('Tasks', { didUpdate: true });
                    }

                },
                { text: 'No', onPress: () => { } },
            ])
    }

    return (
        <PaperProvider>
            <View>
                <Text style={styles.header}>{isEditing ? 'Edit Task' : 'Add Task'}</Text>
                <View style={styles.cardContainer} >
                    <TextInput
                        placeholder='Title'
                        onChangeText={(title) => setTitle(title)}
                        style={styles.input}
                        value={title}
                    />
                    <View>
                        <TextInput
                            placeholder='Description'
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(description) => setDescription(description)}
                            style={styles.input}
                            value={description}
                        />
                    </View>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                            <DateTimePicker
                                mode='single'
                                onChange={(arg) => {
                                    setDate((arg.date as Dayjs).format('DD-MM-YYYY'));
                                    hideModal();
                                }}
                            />
                        </Modal>
                    </Portal>
                    <View style={styles.modifyContainer}>
                        <TouchableOpacity style={styles.dueDateContainer} onPress={() => { setVisible(true) }}>
                            <Icon name='calendar-outline' size={30} color={colors.black
                            } />
                            <Text style={styles.dueDate}>{date}</Text>
                        </TouchableOpacity>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={() => {
                                    setIsSelected(!isSelected);
                                }} />
                            <Text style={styles.checkbox}>Completed</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}  >
                        <Pressable onPress={deleteHandler} android_ripple={{ color: colors.lightGreen, borderless: true }} >
                            <Text style={styles.deleteButton}>Delete</Text>
                        </Pressable>
                        <Pressable onPress={ClearHandler} android_ripple={{ color: colors.lightGreen, borderless: true }}>
                            <Text style={styles.clearButton}>Clear</Text>
                        </Pressable>
                        <Pressable onPress={SubmitHandler} android_ripple={{ color: colors.lightGreen, borderless: true }} >
                            <Text style={styles.addButton}>{isEditing ? 'Update' : 'Add'}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
}

export default Manage;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 16,
        width: 380,
        padding: 12,
        height: 330,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignSelf: 'center'

    },
    input: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        backgroundColor: colors.lightGreen2,
        padding: 10,
        borderRadius: 10,
        marginBottom: 16,
        textAlignVertical: 'top'
    },
    dueDate: {
        justifyContent: 'space-between',
        marginLeft: 4
    },
    dueDateContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.lightGreen2,
        padding: 8,
        color: colors.grey,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        padding: 10,
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        marginVertical: 40,

    },
    addButton: {
        color: '#0B193D',
        fontWeight: 'bold',
        fontSize: 16,
        bottom: 20

    },
    clearButton: {
        color: '#E9967A',
        fontWeight: 'bold',
        fontSize: 16,
        bottom: 20

    },
    deleteButton: {
        color: '#F73466',
        fontWeight: 'bold',
        fontSize: 16,
        bottom: 20

    },
    checkboxContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.lightGreen2,
        padding: 8,
        color: colors.grey,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkbox: {
        justifyContent: 'space-between',
        marginLeft: 4
    },
    modifyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})