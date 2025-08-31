import { PRIVATE_RESEND_KEY } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { Resend } from 'resend';

// Validate Resend API key
if (!PRIVATE_RESEND_KEY || PRIVATE_RESEND_KEY === 'test_key') {
  console.warn('⚠️  Warning: Invalid or missing PRIVATE_RESEND_KEY. Email functionality will not work.');
}

const resend = new Resend(PRIVATE_RESEND_KEY);

export async function sendVerificationEmail(email: string, url: string, token: string) {

  

  const verifyUrl = url.startsWith("http")
    ? url 
    : `${PUBLIC_BASE_URL}/api/auth${url}`;
    
  console.log(`📧 Attempting to send verification email to: ${email}`);
  console.log(`🔗 Verification URL: ${verifyUrl}`);
    
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev', 
    to: [email],
    subject: 'Verify your email address',
    html: `
      <h2>Welcome to Acme</h2>
      <p>Please verify your email by clicking the link below:</p>
      <p><a href="${verifyUrl}">Click here</a> to verify your email</p>
      <p>This link will expire shortly. If you did not create an account, feel free to ignore this email.</p>
    `,
  });

  if (error) {
    console.error('❌ Resend verification email error:', error);
    throw new Error(`Failed to send verification email: ${error.message || 'Unknown error'}`);
  }
  
  console.log('✅ Verification email sent successfully:', data);
  return data;
}

export async function sendResetPasswordEmail(email: string, url: string, token: string) {
  
  // Check if we have a valid API key
  if (!PRIVATE_RESEND_KEY || PRIVATE_RESEND_KEY === 'test_key') {
    const error = 'Email service not configured properly. Missing or invalid PRIVATE_RESEND_KEY.';
    console.error('❌ Reset password email failed:', error);
    throw new Error(error);
  }
  
  const resetUrl = url.startsWith("http")
    ? url 
    : `${PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
    
  console.log(`📧 Attempting to send reset password email to: ${email}`);
  console.log(`🔗 Reset URL: ${resetUrl}`);
    
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev', 
    to: [email],
    subject: 'Reset your password',
    html: `
      <h2>Reset Your Password</h2>
      <p>You have requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link will expire in 1 hour. If you did not request a password reset, feel free to ignore this email.</p>
    `,
  });

  if (error) {
    console.error('❌ Resend email error:', error);
    throw new Error(`Failed to send reset password email: ${error.message || 'Unknown error'}`);
  }
  
  console.log('✅ Reset password email sent successfully:', data);
  return data;
}

export async function sendInviteEmail(email: string, eventName: string, RVSP_TOKEN: string) {
  console.log(email, eventName, RVSP_TOKEN)

  const inviteUrl = `${PUBLIC_BASE_URL}/rsvp/${RVSP_TOKEN}`;
    
  console.log(`📧 Attempting to send invite email to: ${email}`);
  console.log(`🔗 Invite URL: ${inviteUrl}`);
    
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: [email],
    subject: `You're invited to ${eventName}`,
    html: `
      <h2>You're Invited to ${eventName}!</h2>
      <p>We are excited to invite you to our event: <strong>${eventName}</strong>.</p>
      <p>Please click the link below to view event details and RSVP:</p>
      <p><a href="${inviteUrl}">View Event</a></p>
      <p>We hope to see you there!</p>
    `,
  })
 if (error) {
    console.error('❌ Resend email error:', error);
    throw new Error(`Failed to send reset password email: ${error.message || 'Unknown error'}`);
  }
   
  console.log('✅ invite email sent successfully:', data);
  return data
  
  }