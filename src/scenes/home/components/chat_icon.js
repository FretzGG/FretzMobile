import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function ChatIcon(props) {
  const [unreadNo, setUnreadNo] = useState(0);

  useEffect(() => {
    setUnreadNo(props.unreadNo);
  }, [props.unreadNo]);

  return(
    <View>
      <View style={styles.chat_circle}>
        <FontAwesomeIcon
          icon={faComment}
          color={ '#DEB841'}
          size={43} 
        />
      </View>
      {unreadNo > 0 && 
        <View style={styles.notification_circle}>
          <Text style={styles.notification_number}>{unreadNo}</Text>
        </View> 
      }
    </View>
  );
}

export const styles = StyleSheet.create({
  chat_circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#37323E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification_circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E15252',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 47,
    marginLeft: 40
  },
  notification_number: {
    color: '#E6E6E6',
    fontWeight: 'bold',
  }
});