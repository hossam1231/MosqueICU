import { TextInputProps } from "react-native";
import { SIconInput, STextInput, STextInputContainer } from "./styles";
import theme from "styles/GlobalStyles";
import { Feather } from "@expo/vector-icons";
import { Box, Center, HStack, Text } from "native-base";

interface Props extends TextInputProps {
  showIcon?: boolean;
}

export function HTextInput({ showIcon = true, ...rest }: Props) {
  return (
    <STextInputContainer>
      {showIcon && (
        <SIconInput>
          <Feather name="search" size={22} color={theme.colors.gray} />
        </SIconInput>
      )}

      <STextInput {...rest} placeholderTextColor={theme.colors.gray} />
    </STextInputContainer>
  );
}

export function HTextInputHeader({ showIcon = true, ...rest }: Props) {
  return (
    <STextInputContainer>
      <HStack>
        {/* {showIcon && (
          <SIconInput>
            <Feather name="search" size={22} color={theme.colors.gray} />
          </SIconInput>
        )} */}

        <Center flex={"1"}>
          <Text color="white"> Feed </Text>
        </Center>
        <Center flex={"1"}>
          <Text color="white"> Analytics </Text>
        </Center>
        <Center flex={"1"}>
          <Text color="white"> Friends </Text>
        </Center>
      </HStack>
    </STextInputContainer>
  );
}
