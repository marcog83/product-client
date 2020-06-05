 

  const dev = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "product-ext-uploads-dev-s3bucket-1p5gu58k7xzpk"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://epq9j27uo2.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_mCcXN6MgJ",
      APP_CLIENT_ID: "1nbai2no7mfe6m604ef9e71sc3",
      IDENTITY_POOL_ID: "us-east-1:2f96cf7b-06c0-4bea-a52f-e7d8a9b4f29f"
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