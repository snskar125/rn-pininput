import { memo, useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const Cell = memo((props) => (
  <TouchableWithoutFeedback
    onPress={() => {
      props.onPress(props.index);
    }}
  >
    <View
      style={
        props.isFocused
          ? [styles.focusedInputBox, props.focusedInputBoxStyle]
          : [styles.inputBox, props.inputBoxStyle]
      }
    >
      <Text style={[styles.text, props.textStyle]}>{props.character}</Text>
    </View>
  </TouchableWithoutFeedback>
));
const PINInput = memo((props) => {
  const input = useRef();
  const [focused, setFocused] = useState("");
  const {
    value: inputValue,
    onChangeValue,
    containerStyle,
    numberOfDigits,
    inputBoxStyle,
    focusedInputBoxStyle,
    textStyle,
    onBlur,
    onFocus,
    onPressInput,
    hidden,
    hiddenCharacter,
  } = props;
  const value = inputValue?.toString();
  const handleTextChange = (text) => {
    if (text.length <= numberOfDigits) onChangeValue(text);
    if (text.length === numberOfDigits) input.current?.blur();
  };
  const handleBlur = (e) => {
    onBlur(e);
    setFocused(false);
  };
  const handleFocus = (e) => {
    onFocus(e);
    setFocused(true);
  };
  const handlePress = useCallback((index) => {
    onPressInput(index);
    if (input.current?.isFocused()) input.current?.blur();
    input.current?.focus();
  }, []);
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        keyboardType="number-pad"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        ref={input}
        style={styles.hidden}
      />
      {[...Array(numberOfDigits).keys()].map((_, index) => (
        <Cell
          key={index}
          onPress={handlePress}
          isFocused={
            focused &&
            (value.length === index ||
              (value.length === numberOfDigits && index === numberOfDigits - 1))
          }
          inputBoxStyle={inputBoxStyle}
          focusedInputBoxStyle={focusedInputBoxStyle}
          textStyle={textStyle}
          character={
            value.charAt(index)
              ? hidden
                ? hiddenCharacter
                : value.charAt(index)
              : ""
          }
          index={index}
        />
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
  onFocus: () => {},
  onBlur: () => {},
  onPressInput: () => {},
  containerStyle: {},
  textStyle: {},
  inputBoxStyle: {},
  focusedInputBoxStyle: {},
  hidden: false,
  hiddenCharacter: "⨀",
};
export default PINInput;
