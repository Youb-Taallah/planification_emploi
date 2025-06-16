package ISIMM.planification.Security.dto;

public class ValidateRequest {

    private String accessToken;

    public ValidateRequest(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

}
