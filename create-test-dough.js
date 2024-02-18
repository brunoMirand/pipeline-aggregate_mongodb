import { performance  } from 'node:perf_hooks';
import mongoose from 'mongoose';
import { randomUUID as uuidv4 } from 'node:crypto';

(async () => {
  const start = performance.now();
  try {
    // Conectar ao MongoDB
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexão com o MongoDB estabelecida com sucesso');

    const UserSchema = new mongoose.Schema({
      name: String,
      id_detail: String,
    });

    const UserDetailsSchema = new mongoose.Schema({
      id_detail: String,
      observation: String,
    });

    const uuid = uuidv4();
    console.log(uuid);
    // Criar os modelos
    const User = mongoose.model('User', UserSchema);
    const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);


    // for (let i = 0; i < 20; i++) {
    //   await User.create({
    //     name: `User ${i + 1+1}`,
    //     id_detail: `${uuid + i}`,
    //   });
    // }

    for (let i = 0; i < 18000; i++) {
      await UserDetails.create({
        id_detail: `${uuid + i}`,
        observation: `Observation ${i + 1}`,
      });
    }

    console.log('Registros inseridos com sucesso');
    mongoose.disconnect();
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  } finally {
    const end = performance.now();
    console.debug('Disconnet database');
    console.log(`Timing ${end - start} milliseconds`);
    mongoose.disconnect();
  }
})();
