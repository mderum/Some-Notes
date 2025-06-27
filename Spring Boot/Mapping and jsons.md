
    ObjectMapper objectMapper = new ObjectMapper();
      *set the fail on  unknown properties as false , so that if unknown properties are present ignore them
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
