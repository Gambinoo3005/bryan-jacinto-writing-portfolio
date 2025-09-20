# Contact Form Setup Instructions

The contact form is now set up and ready to use! Here are the options for sending emails:

## Current Status
- ✅ Contact form created with Name, Email, Phone, and Message fields
- ✅ Form validation and error handling
- ✅ Responsive design matching your portfolio theme
- ✅ API endpoint ready for email integration

## Email Service Options

### Option 1: EmailJS (Recommended - Easy Setup)
EmailJS is a client-side email service that's perfect for static sites.

1. **Sign up at [EmailJS.com](https://www.emailjs.com/)**
2. **Create an Email Service:**
   - Go to Email Services → Add New Service
   - Choose Gmail, Outlook, or any email provider
   - Connect your email account (bryan@advdms.com)

3. **Create an Email Template:**
   - Go to Email Templates → Create New Template
   - Use this template content:
   ```
   Subject: New Contact Form Submission from {{from_name}}
   
   You have received a new message from your portfolio contact form:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   Message:
   {{message}}
   
   ---
   This message was sent from your portfolio contact form.
   ```

4. **Get your credentials:**
   - Service ID (starts with "service_")
   - Template ID (starts with "template_")
   - Public Key (starts with letters/numbers)

5. **Update the API file:**
   - Open `src/pages/api/contact-emailjs.ts`
   - Replace the placeholder values with your actual credentials
   - Rename the file to `contact.ts` (replace the existing one)

### Option 2: Netlify Forms (If deploying to Netlify)
If you're deploying to Netlify, you can use their built-in form handling:

1. Add `netlify` attribute to your form:
   ```html
   <form id="contact-form" class="space-y-6" netlify>
   ```

2. Remove the JavaScript form handling and let Netlify handle it automatically.

### Option 3: Vercel + Email Service
If deploying to Vercel, you can use:
- SendGrid
- Mailgun
- Nodemailer with SMTP

## Testing the Form

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the contact page:**
   - Go to `http://localhost:4321/contact`
   - Fill out the form and submit

3. **Check the console:**
   - Form submissions will be logged in the browser console
   - Check the terminal for server-side logs

## Form Features

- **Validation:** Required fields (Name, Email, Message)
- **Email format validation**
- **Loading states** during submission
- **Success/error messages**
- **Responsive design** that matches your portfolio
- **Accessibility** with proper labels and focus states

## Customization

You can easily customize:
- Form fields (add/remove fields)
- Styling (modify CSS classes)
- Validation rules
- Email template content
- Success/error messages

## Security Notes

- The current setup includes basic validation
- For production, consider adding:
  - Rate limiting
  - CAPTCHA
  - Spam filtering
  - Input sanitization

## Need Help?

If you need help setting up any of these email services, let me know! The EmailJS option is usually the quickest to get working.
