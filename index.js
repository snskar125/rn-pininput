import { memo, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const PINInput = memo((props) => {
  const input = useRef();
  const {
    value: inputValue,
    onChangeValue,
    containerStyle,
    numberOfDigits,
    inputBoxStyle,
    focusedInputBoxStyle,
    textStyle,
    hidden,
  } = props;
  const value = inputValue?.toString();
  const handleTextChange = (text) => {
    if (text.length <= numberOfDigits) onChangeValue(text);
    if (text.length === numberOfDigits) input.current?.blur();
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        keyboardType="number-pad"
        value={value}
        onChangeText={handleTextChange}
        ref={input}
        style={styles.hidden}
      />
      {[...Array(numberOfDigits).keys()].map((_, index) => (
        <TouchableWithoutFeedback
          onPress={() => {
            if (input.current?.isFocused()) input.current?.blur();
            input.current?.focus();
          }}
          key={index}
        >
          <View
            style={
              value.length === index
                ? [styles.focusedInputBox, focusedInputBoxStyle]
                : [styles.inputBox, inputBoxStyle]
            }
          >
            <Text style={[styles.text, textStyle]}>
              {value.charAt(index) ? (hidden ? "•" : value.charAt(index)) : ""}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  inputBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  focusedInputBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#505050",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "FAFAFA",
  },
  text: {
    fontSize: 23,
    textAlign: "center",
    color: "#505050",
  },
  hidden: {
    opacity: 0,
    position: "absolute",
  },
});
PINInput.defaultProps = {
  numberOfDigits: 4,
  value: "",
  onChangeValue: () => {},
  containerStyle: {},
  textStyle: {},
  inputBoxStyle: {},
  focusedInputBoxStyle: {},
  hidden: false,
};
export default PINInput;
