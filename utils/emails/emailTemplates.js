const API_URL = 'http://127.0.0.1:5000/api/v1';

export const comfirmationEmail = (token, user) => {
    return `<div style="background-color:#f1f1f1;margin:20px;padding:20px;font-size:15px;width:40%;margin:auto;">
    <p>
      Hello ${user.firstname},<br /><br />
      Thank you for signing up to the Authors' Heaven. Please click the link below to activate your
      account
    </p>
    <a
      style="display:inline-block;text-decoration:none;margin:10px 0;background-color:#4CAF50;padding:10px;color:#fff"
      href="${API_URL}/auth/activate/${token}"
      >Activate</a>
    <p>Thank you for choosing us!</p>
  </div>`;
};
