// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: 'Credentials',
//       authorize: async (credentials) => {
//         // Replace with your own logic
//         const user = await axios.post('/api/login', {
//           username: credentials.username,
//           password: credentials.password,
//         });
//         if (user) {
//           return { ...user.data, role: user.data.role }; // Add role to session
//         } else {
//           throw new Error('Invalid credentials');
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
// });
