import firestore from '@react-native-firebase/firestore';

export const getInitialGlobalData = async () => {
  await firestore()
    .collection('Category')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
};
