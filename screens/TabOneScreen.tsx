import * as React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform, View, StatusBar } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { WalletConnectProvider } from "@walletconnect/react-native-dapp/dist/providers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootTabScreenProps } from "../types";

const shortenAddress = (address : any) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

function Button({ press, label } : any) {
  return (
    <TouchableOpacity onPress={press} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

function ConnectToWallet() {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    console.log("connecting")
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    
    <>
      {!connector.connected ? (
        <Button press={connectWallet} label="Connect a wallet" />
      ) : (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <Button press={killSession} label="Log out" />
        </>
      )}
    </>
  );
}


const SCHEME_FROM_APP_JSON = "walletconnect-example";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return(
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === "web"
          ? window.location.origin
          : `${SCHEME_FROM_APP_JSON}://`
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
    >
      <View style={styles.container}>

        <ConnectToWallet />

        
      </View>
    </WalletConnectProvider>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
