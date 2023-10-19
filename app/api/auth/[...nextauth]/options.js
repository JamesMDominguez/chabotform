import AzureADProvider from "next-auth/providers/azure-ad";
import mongoose from 'mongoose';

export const options = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
          })
    ],  
    callbacks: {
        async signIn(user, account, profile) {
          try {
            await mongoose.connect(process.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            console.log('Connected to database!');
    
            const db = mongoose.connection.db;
            const existingUser = await db.collection('User').findOne({ email: user.user.email });
            if (!existingUser) {
              await db.collection('User').insertOne({ email: user.user.email, name: user.user.name, profile_image: user.user.image });
            }
            return true;
          } catch (error) {
            console.error('Error connecting to database:', error);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(() => signIn(user, account, profile), 5000);
          }
        }
      }
}