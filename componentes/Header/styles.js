import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors'

export const styles = StyleSheet.create({
    todo: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '300',
    },
    header: {
        backgroundColor: `${COLORS.terciary}`,
        paddingTop: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 2.84,
        elevation: 5,
    }
})