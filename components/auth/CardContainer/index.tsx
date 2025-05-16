import { View, useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

const CardContainer = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowDimensions();
  const isMobileScreen = width < 640;
  return (
    <View
      style={{
        backgroundColor: isMobileScreen ? "#f6f0f6" : "#f6f6f6",
        flex: 1,
        minHeight: 700,
        padding: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toast />
      <View
        style={{
          backgroundColor: "#f6f0f6",
          maxHeight: 400,
          minWidth: 400,
          padding: 20,
          borderRadius: 30,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 25,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CardContainer;
