import DeviceInfo from 'react-native-device-info'

let headers = {
  "Content-Type": "application/json"
};

const API_CONFIG = {
  apiUrl: "https://subdomain.domain.com",
  version: 0.1,    
  deviceId: DeviceInfo.getUniqueId(),
  methods: {
    apiName: {
      path: "apiPathToBeFilledInWithoutDomain",
      method: "POST",
      cache: "false",
      ttl: "0"
    },
  }
};
export { API_CONFIG, headers };