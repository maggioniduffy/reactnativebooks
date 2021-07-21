import React, {useEffect, useReducer} from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native'

const INPUT_CHANGE = 'CHANGE'
const INPUT_BLUR = 'BLUR'

const inputReducer = (state,action) =>{
    switch(action.type){
        case INPUT_CHANGE:
            return {...state, value: action.value, isValid: action.isValid};
        case INPUT_BLUR:
            return {...state, touched: true};
        default:
            return state
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        touched: false,
    })
    
    const {onInputChange = ()=>{}, id} = props

    useEffect(()=>{
        if(inputState.touched){
            onInputChange(id,inputState.value,inputState.isValid)
        }
    }, [inputState, onInputChange ])

    const textChangeHandler = (text) => {

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    
    if (props.required && text.trim().length === 0) isValid = false;
    
    if (props.email && !emailRegex.test(text.toLowerCase())) isValid = false;
    
    if (props.min != null && +text < props.min) isValid = false;
    
    if (props.max != null && +text > props.max) isValid = false;
    
    if (props.minLength != null && text.length < props.minLength) isValid = false;
    
      dispatch({
          type: INPUT_CHANGE,
          value: text,
      })
    }


    const onBlurHandler = () => dispatch({type: INPUT_BLUR})

    return (
        <View>
            <Text>
                {props.label}
            </Text>
            <TextInput {...props} style={styles.input} onChangeText={textChangeHandler} onBlur={onBlurHandler}/>
            {!inputState.isValid && inputState.touched && (
                <View>
                    <Text>
                        {props.errorText}
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
      },
      label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
      },
      input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
      errorContainer: {
        marginTop: 6,
        marginBottom: 8,
      },
      errorText: {
        color: "#ff0000",
      },
})

export default Input