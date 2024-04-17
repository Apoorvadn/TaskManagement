import React, { FC, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';

import { colors } from "../assets/colors/globalcolors";
import MenuWrapper from './menu';

interface CardViewProps {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: number;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onCompleteTask: (id: string, isCompleted: boolean) => void;
}

const CardView: FC<CardViewProps> = ({ id, title, description, dueDate, isCompleted, onDelete, onEdit, onCompleteTask }) => {
    const [isSelected, setIsSelected] = useState<boolean>(isCompleted === 0 ? false : true);
    const childRef = useRef<any>(null);


    useEffect(() => {
        setIsSelected(isCompleted === 0 ? false : true);
    }, [isCompleted])

    const openMenu = () => {
        if (childRef?.current) {
            childRef?.current.childFunc();
        }
    }

    let isOverdue = false
    const currentDate = new Date().getTime();
    const dateParts = dueDate.split('-');
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[0], 10);
    const currentTime = new Date();
    const dueDateFormated = new Date(year, month, day, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds()).getTime();

    if (dueDateFormated < currentDate) {
        isOverdue = true
    }

    const cardStyle = isCompleted === 1 ? {
        ...styles.cardContainer,
        ...styles.completedCard
    } : isOverdue ? {
        ...styles.cardContainer,
    } : {
        ...styles.cardContainer
    }


    return (
        <View style={cardStyle} >
            <View style={styles.menuContainer}>
                <MenuWrapper ref={childRef} style={styles.menuButton} onDelete={onDelete} id={id} onEdit={onEdit}>
                </MenuWrapper>
                <Pressable onPress={openMenu} style={styles.dateContainer}>
                    <Icon name='infinite-outline' size={95} color={isOverdue ? colors.darkPink : colors.lightGreen} />
                </Pressable>
            </View>
            <Text numberOfLines={1} style={styles.cardTitle}>{title}</Text>
            <Text numberOfLines={1} style={styles.cardDescription}>{description}</Text>
            <View style={styles.dueDateContainer}>
                <CheckBox
                    style={styles.checkbox}
                    value={isSelected}
                    onValueChange={() => {
                        setIsSelected(!isSelected);
                        onCompleteTask(id, !isSelected)
                    }}
                />
                <Text style={isOverdue ? styles.isOverDueDate : styles.dueDate}>{dueDate}</Text>
            </View>
        </View >
    );
}

export default CardView;

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        left: 300,
        top: -4,
        paddingRight: 6,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
    },
    menuButton: {
        height: 50,
        width: 50,
        margin: 10,
        color: colors.blue,
    },
    dateBackground: {
        fontSize: 90,
        color: colors.lightGreen,
    },
    dateContainer: {
        margin: 10,
        top: -35,
        right: 30,
    },
    dueDate: {
        justifyContent: 'space-between',
        borderRadius: 20,
        backgroundColor: colors.lightGreen,
        marginLeft: 5,
        padding: 4,
        color: colors.grey,
    },
    isOverDueDate: {
        justifyContent: 'space-between',
        borderRadius: 20,
        backgroundColor: colors.darkPink,
        marginLeft: 5,
        padding: 4,
        color: colors.white,
    },
    checkbox: {
        borderRadius: 10,
        marginTop: 4
    },
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 16,
        width: 380,
        padding: 12,
        height: 100,
        elevation: 3,
        margin: 5
    },
    completedCard: {
        backgroundColor: colors.green
    },
    isOverDue: {
        backgroundColor: colors.darkPink
    },
    dueDateContainer: {
        flexDirection: 'row',

    },
    cardTitle: {
        width: 280,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDescription: {
        width: 250,
        fontSize: 14,
        marginBottom: 8,
    },
    completedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completedText: {
        fontSize: 12,
    },
    completedDate: {
        fontSize: 12,
        marginTop: 4,
    }
})