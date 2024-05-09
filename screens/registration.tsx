import { View } from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { StyleSheet, ScrollView } from "react-native";
import { TextInput, Text, RadioButton, Button } from 'react-native-paper';
import { useState } from "react";

interface Inputs {
    username: string;
    dateOfBirth: string
    ;
    female: string;
    male: string;
    others: string;
    motherName: string;
    fatherName: string;
    occupation: string;
    address: string;
    email: string;
    password: string;
    phoneNumber: string;
}

function Registration() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, reset } = useForm<Inputs>()
    const [genderSelected, setGenderSelected] = useState('')

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    function handleReset() {
        reset();
    }



    return (<ScrollView>
        <View >
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        onBlur={onBlur}
                        mode='outlined'
                        label='User Name'
                        placeholder='Enter User Name'
                        onChangeText={onChange}
                        value={value}
                        style={styles.userContainer}
                    />
                )}
                name="username"
                rules={{
                    required: 'This field is required',
                    minLength: { value: 3, message: 'Require minimum 3 characters' },
                    maxLength: { value: 20, message: 'maximum length of the characters exceeded' }
                }}
            />
            {errors.username && (
                <Text style={{ color: 'red' }}>{errors.username?.message || 'Error'}</Text>
            )}

        </View>

        <View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    < TextInput
                        onBlur={onBlur}
                        label={'Date Of Birth'}
                        placeholder="DD/MM/YYYY"
                        onChangeText={onChange}
                        mode="outlined"
                        value={value}
                        style={styles.DOBContainer}
                    />
                )}
                name="dateOfBirth"
                rules={{
                    required: 'This field is required',
                }}
            />
            {errors.dateOfBirth && (
                <Text style={{ color: 'red' }}>{errors.dateOfBirth?.message || 'Error'}</Text>
            )}
        </View>

        <Text variant="bodyLarge" style={styles.textContainer}>Gender</Text>

        <View style={styles.parentRadioContainer}>
            <View style={styles.radioButtonContainer}>
                <Text>Female</Text>
                <RadioButton
                    value='Female'
                    status={genderSelected === 'Female' ? 'checked' : 'unchecked'}
                    onPress={() => setGenderSelected('Female')}
                    {...register('female')}
                />
            </View>
            <View style={styles.radioButtonContainer}>
                <Text>Male</Text>
                <RadioButton
                    value='Male'
                    status={genderSelected === 'Male' ? 'checked' : 'unchecked'}
                    onPress={() => setGenderSelected('Male')}
                    {...register('male')}
                />
            </View>
            <View style={styles.radioButtonContainer}>
                <Text>Others</Text>
                <RadioButton
                    value='Others'
                    status={genderSelected === 'Others' ? 'checked' : 'unchecked'}
                    onPress={() => setGenderSelected('Others')}
                    {...register('others')}
                />
            </View>
        </View>
        <Text style={styles.textContainer}
        > Personal Information</Text>
        <View style={styles.personalDetailsContainer} >
            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextInput
                            onBlur={onBlur}
                            mode='outlined'
                            label='Mother`s or Maiden`s Name'
                            placeholder='Enter Mother`s or Maiden`s Name'
                            onChangeText={onChange}
                            value={value}
                            style={styles.personalDetailsContainer}
                        />
                    )}
                    name="motherName"
                    rules={{
                        required: 'This field is required',
                        minLength: { value: 3, message: 'Require minimum 3 characters' },
                        maxLength: { value: 20, message: 'maximum length of the characters exceeded' }
                    }}
                />
                {errors.motherName && (
                    <Text style={{ color: 'red' }}>{errors.motherName?.message || 'Error'}</Text>
                )}
            </View>

            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextInput
                            onBlur={onBlur}
                            mode='outlined'
                            label='Father`s Name'
                            placeholder='Enter Father`s Name'
                            onChangeText={onChange}
                            value={value}
                            style={styles.personalDetailsContainer}
                        />
                    )}
                    name="fatherName"
                    rules={{
                        required: 'This field is required',
                        minLength: { value: 3, message: 'Require minimum 3 characters' },
                        maxLength: { value: 20, message: 'maximum length of the characters exceeded' }
                    }}
                />
                {errors.fatherName && (
                    <Text style={{ color: 'red' }}>{errors.fatherName?.message || 'Error'}</Text>
                )}
            </View>

            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextInput
                            onBlur={onBlur}
                            mode='outlined'
                            label='Occupation'
                            placeholder='Enter Occupation'
                            onChangeText={onChange}
                            value={value}
                            style={styles.personalDetailsContainer}
                        />
                    )}
                    name="occupation"
                    rules={{
                        required: 'This field is required',
                        minLength: { value: 5, message: 'Require minimum 5 characters' },
                        maxLength: { value: 20, message: 'maximum length of the characters exceeded' }
                    }}
                />
                {errors.occupation && (
                    <Text style={{ color: 'red' }}>{errors.occupation?.message || 'Error'}</Text>
                )}
            </View>
        </View>
        <Text style={styles.textContainer}> Contact Information </Text>
        <View>
            <TextInput
                label={'Address'}
                placeholder="Mention Your Address"
                onChangeText={() => { }}
                {...register('address')}
                mode="outlined"
                multiline={true}
                style={styles.addressContainer}
            />
        </View>
        <View style={styles.contactDetailsContainer}>
            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextInput
                            onBlur={onBlur}
                            mode='outlined'
                            label='Email ID'
                            placeholder='Enter your valid Email ID'
                            onChangeText={onChange}
                            value={value}
                            keyboardType='email-address'
                            style={styles.contactDetailsContainer}
                        />
                    )}
                    name="email"
                    rules={{
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address.',
                        }
                    }}
                />
                {errors.email && (
                    <Text style={{ color: 'red' }}>{errors.email?.message || 'Error'}</Text>
                )}
            </View>

            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Password"
                            secureTextEntry={true}
                            mode="outlined"
                            style={styles.contactDetailsContainer}
                        />
                    )}

                    name="password"
                    rules={{
                        required: 'Password is required.',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long.',
                        },
                    }}
                />
                {errors.password && (
                    <Text style={{ color: 'red' }}>{errors.password.message}</Text>
                )}
            </View>

            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextInput
                            onBlur={onBlur}
                            mode='outlined'
                            label='Phone Number'
                            placeholder='Enter your valid Phone Number'
                            onChangeText={onChange}

                            value={value}
                            keyboardType='phone-pad'
                            style={styles.contactDetailsContainer}
                        />
                    )}
                    name="phoneNumber"
                    rules={{
                        required: 'Phone number is required.',
                        pattern: {
                            value: /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/,
                            message: 'Invalid phone number format',
                        }
                    }}
                />
                {errors.phoneNumber && (
                    <Text style={{ color: 'red' }}>{errors.phoneNumber?.message || 'Error'}</Text>
                )}
            </View>
        </View>
        <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode="contained" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'SUBMIT'}</Button>
            <Button style={styles.button} mode="contained" onPress={handleReset}>RESET</Button>
        </View>
    </ScrollView>

    );
}

export default Registration;

const styles = StyleSheet.create({
    userContainer: {
        width: 400,
        margin: 3,
        padding: -1,
    },
    DOBContainer: {
        width: 400,
        margin: 3,
        padding: -1,
    },
    textContainer: {
        left: 10,
        top: 4,
        fontWeight: 'bold'
    },
    parentRadioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    personalDetailsContainer: {
        width: 400,
        margin: 1,
        padding: -1,
    },
    addressContainer: {
        margin: 6,
        height: 100
    },
    contactDetailsContainer: {
        width: 400,
        margin: 1,
        padding: -1,
    },
    buttonsContainer: {
        top: 9,
    },
    button: {
        margin: 10,
    }
})