import React, { forwardRef, FC, useRef, useImperativeHandle, useState, ForwardRefRenderFunction } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../assets/colors/globalcolors';

interface MenuWrapperProps {
    id: string;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    style?: React.CSSProperties;
}

interface MenuWrapperRef {
    childFunc: () => void;
}

const MenuWrapper: ForwardRefRenderFunction<MenuWrapperRef, MenuWrapperProps> = (props, ref) => {
    const menuRef = useRef<MenuWrapperRef>(null);
    const [visible, setVisible] = useState(false);

    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);

    useImperativeHandle(ref, () => ({
        childFunc: () => openMenu(),
    }));

    const onDelete = () => {
        Alert.alert('Are you sure you want to delete!', '', [
            {
                text: 'Yes',
                onPress: () => {
                    props.onDelete(props.id);
                    closeMenu();
                },
            },
            { text: 'No', onPress: () => closeMenu(), style: 'cancel' },
        ]);
    };

    const onEdit = () => {
        props.onEdit(props.id);
    };

    return (
        <Pressable onPress={openMenu}>
            <Menu
                visible={visible}
                anchor={
                    <Pressable onPress={openMenu}>
                        <Icon name="ellipsis-horizontal" size={30} color={colors.black} />
                    </Pressable>
                }
                onRequestClose={closeMenu}
            >
                <MenuItem onPress={onEdit} textStyle={{ color: '#000' }}>
                    Edit
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={onDelete}>Delete</MenuItem>
            </Menu>
        </Pressable>
    );
}

const ForwardedMenuWrapper = forwardRef<MenuWrapperRef, MenuWrapperProps>(MenuWrapper);
export default ForwardedMenuWrapper;

const styles = StyleSheet.create({
    editMenu: {
        color: colors.black,
    },
});