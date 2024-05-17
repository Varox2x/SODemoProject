const { CosmosClient } = require("@azure/cosmos");


const options = {
  endpoint: 'https://sodemoproject.documents.azure.com:443/',
  key: '4rwm6sVRRQ17wDvpXR67ZKgN53WTCLgr9CRG7WtcE1LdMvVCwdQGD1gXzfv04bsJWe29DkxTllGeACDbHpOZpQ',
  userAgentSuffix: 'CosmosDBJavascriptQuickstart'
};

const client = new CosmosClient(options);

module.exports = client;

