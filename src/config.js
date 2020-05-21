 

  const dev = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "product-list-uploads"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://uez93u1rbk.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_mflmGrRy6",
      APP_CLIENT_ID: "619ns088gk9k07u3elkr0ka5bv",
      IDENTITY_POOL_ID: "us-east-1:98a09952-f76b-42e1-867d-d998aae1cb21"
    }
  };
  
  const prod = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "product-list-uploads"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://coxea1byv1.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_nh2YXQfCr",
      APP_CLIENT_ID: "622a5d432qo9tnirr81iric8fs",
      IDENTITY_POOL_ID: "us-east-1:5f8bb8ee-5de1-46a3-8fc1-22048d7a32ec"
    }
  };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };