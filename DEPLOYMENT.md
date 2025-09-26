# Chadrick - Independent Vercel Deployment Guide

## 🏋️ Setting Up Chadrick as His Own Vercel Project

### Prerequisites
- Vercel account
- OpenAI API key
- Git repository (optional but recommended)

### Step 1: Create New Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import this Chadrick folder or upload directly
4. Choose a unique project name (e.g., `chadrick-ai-assistant`)

### Step 2: Set Environment Variables
In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
CHADRICK_OPENAI_API_KEY = your_openai_api_key_here
CHADRICK_PASS = your_chosen_password_here
```

### Step 3: Deploy
1. Deploy the project
2. Your Chadrick will be available at: `https://your-project-name.vercel.app`

### Environment Variables Explained
- `CHADRICK_OPENAI_API_KEY`: Your OpenAI API key (separate from Queso's)
- `CHADRICK_PASS`: Password required after 5 free messages (can be different from Queso's)

### File Structure
```
Chadrick/
├── index.html              # Main chat interface
├── api/
│   └── chadrick.js         # Serverless API handler
├── chadrick prompt.txt     # AI personality prompt
├── vercel.json            # Vercel configuration
├── chadrick.png           # Character icon
├── chadbackground.png     # Gym background image
├── chadfused.png          # Additional image
└── DEPLOYMENT.md          # This guide
```

### Key Differences from Queso
- ✅ Independent API key usage
- ✅ Separate password system
- ✅ Own domain/subdomain
- ✅ Independent billing
- ✅ Separate analytics
- ✅ No interference with Queso's performance

### Testing
After deployment:
1. Visit your Chadrick URL
2. Send a test message
3. Verify the bro personality responds correctly
4. Test the 5-message limit and password system

### Troubleshooting
- If getting "CHADRICK_OPENAI_API_KEY not set" error: Check environment variables
- If password issues: Verify CHADRICK_PASS is set correctly
- If 404 on /api/chadrick: Check vercel.json configuration

Your Chadrick is now completely independent! 🚀