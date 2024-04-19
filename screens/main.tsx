import React, { FC, useEffect, useMemo, useState } from 'react';
import { DeviceEventEmitter, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../assets/colors/globalcolors';
import CardView from '../components/cardView';
import { deleteData, getData, setData, updateData } from '../service/storeService';
import LoadingOverlay from '../components/LoadingOverlay';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: number;
}

interface MainProps {
    navigation: any;
    route: any;
}

const Main: FC<MainProps> = ({ navigation, route }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isfetching, setIsFetching] = useState(true);
    const params = useMemo(() => route.params, [route.params]);
    DeviceEventEmitter.addListener('deleteEvent', (data: { id: string }) =>
        onDelete(data.id));


    useEffect(() => {
        const asyncFnc = async () => {
            setIsFetching(true);
            const allTasks = await getData('tasks') || [];
            setTasks(allTasks);
            setIsFetching(false);
        }
        asyncFnc();
    }, []);

    useEffect(() => {
        const asyncFnc = async () => {
            if (route?.params?.task) {
                const task = route?.params?.task;
                if (task && task.title && task.description) {
                    const t = await getData('tasks') || [];
                    setTasks(t);
                }
            }
            if (route?.params?.didUpdate) {
                const t = await getData('tasks') || [];
                setTasks(t);
                await setData('tasks', t);
            }
        }
        asyncFnc();

    }, [route?.params?.task, params])



    const onDelete = async (id: string) => {
        const filteredTask = tasks.filter((task) => task.id !== id);
        setTasks(filteredTask);
        await deleteData(id);
    }

    const onEdit = (id: string) => {
        const filteredTask = tasks.filter((task) => task.id === id);

        if (filteredTask.length === 1) {
            navigation.navigate('ManageTasks', { task: filteredTask[0], isEditing: true })
        }
    }

    const onCompleteTask = async (id: string, isCompleted: boolean) => {
        const newtasks = [...tasks];
        const taskIndex = newtasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
            newtasks[taskIndex].isCompleted = isCompleted ? 1 : 0;
            setTasks(newtasks);
            await updateData(newtasks[taskIndex]);
        }
    }

    return (
        <View style={styles.container}>
            {isfetching ? <LoadingOverlay /> : tasks && tasks.length ?
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => `'${item.id}'`}
                    renderItem={({ item }) => {
                        return <CardView id={item.id}
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            dueDate={item.dueDate}
                            isCompleted={item.isCompleted}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onCompleteTask={onCompleteTask}
                        />
                    }}
                /> :
                <View>
                    <Image source={require('../assets/Images/TaskImage.jpg')} style={styles.image} />
                    <View>
                        <Text style={styles.subText}>No tasks Added! </Text>
                    </View>
                </View>}
            <TouchableOpacity style={styles.addTaskButton} onPress={() => navigation.navigate('ManageTasks', { isEditing: false })}>
                <Icon name='add-outline' size={30} color={colors.white} />
            </TouchableOpacity>
        </View>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginTop: 8
    },
    image: {
        width: 250,
        height: 250,
    },
    subText: {
        fontSize: 15,
        elevation: 50,
        color: colors.grey
    },
    addTaskButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: colors.blue,
        borderRadius: 100,
    }
})