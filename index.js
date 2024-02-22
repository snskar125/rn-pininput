import { PureComponent, memo, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
const Cell = memo((props) => {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (props.character && props.animated) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [props.character]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress(props.index);
      }}
    >
      <Animated.View
        style={
          props.isFocused
            ? [
                styles.focusedInputBox,
                props.focusedInputBoxStyle,
                { transform: [{ scale }] },
              ]
            : [styles.inputBox, props.inputBoxStyle, { transform: [{ scale }] }]
        }
      >
        <Text style={[styles.text, props.textStyle]}>{props.character}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});
export default class PINInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.input = null;
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.shake = this.shake.bind(this);
    this.translateX = new Animated.Value(0);
  }
  handleTextChange = (text) => {
    if (text.length <= this.props.numberOfDigits)
      this.props.onChangeValue(text);
    if (text.length === this.props.numberOfDigits) this.input?.blur();
  };
  handleBlur = () => {
    this.setState({ focused: false });
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handlePress = (index) => {
    this.props.onPressInput(index);
    if (this.input?.isFocused()) this.input?.blur();
    this.input?.focus();
  };
  focus = () => {
    this.input?.focus();
  };
  blur = () => {
    this.input?.blur();
  };
  shake = () => {
    Animated.sequence([
      Animated.timing(this.translateX, {
        toValue: -10,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(this.translateX, {
        toValue: 10,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(this.translateX, {
        toValue: -10,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(this.translateX, {
        toValue: 10,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(this.translateX, {
        toValue: 0,
        duration: 75,
        useNativeDriver: true,
      }),
    ]).start();
  };
  render() {
    const {
      value,
      containerStyle,
      numberOfDigits,
      inputBoxStyle,
      focusedInputBoxStyle,
      textStyle,
      hidden,
      hiddenCharacter,
      animated,
    } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          { transform: [{ translateX: this.translateX }] },
        ]}
      >
        <TextInput
          keyboardType="number-pad"
          secureTextEntry
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={this.handleTextChange}
          ref={(r) => {
            this.input = r;
          }}
          style={styles.hidden}
        />
        {[...Array(numberOfDigits).keys()].map((_, index) => (
          <Cell
            key={index}
            animated={animated}
            onPress={this.handlePress}
            isFocused={
              this.state.focused &&
              (value.length === index ||
                (value.length === numberOfDigits &&
                  index === numberOfDigits - 1))
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
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
    backgroundColor: "#FFF",
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
  onPressInput: () => {},
  containerStyle: {},
  textStyle: {},
  inputBoxStyle: {},
  focusedInputBoxStyle: {},
  hidden: false,
  hiddenCharacter: "⨀",
  animated: true,
};
