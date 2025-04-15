const generateVerificationEmail  = (token)=>{
    return `
    <h2>Welcome to CHOP BELLEFUL! 🎉🎉</h2>
    <p>Click the link below to verify your email:</p>
    <a href="https://www.linkedin.com/in/semiat-balogun-a4b06b27b/?token=${token}">Verify Your Email</a>
    <p>This link will expire in 1 hour.</p>

    <p>If this is not you, kindly ignore this message</p>
  `;
}

const generateResetMail = (token) => {
  return `
  <h2>Password Reset Link</h2>
  <p>Click the link below to reset your password</p>
  <a href="https://www.linkedin.com/in/semiat-balogun-a4b06b27b/?token=${token}">Reset Password</a>
  <p>This link will expire in 1 hour.</p>

  <p>If this is not you, kindly ignore this message</p>
`;
}

module.exports = {generateVerificationEmail, generateResetMail}