const database = require('./db.js');
const createProffy = require('./createProffy');

database.then( async (db) => {
    //Inserir dados

    proffyValue = {
        name: "Hugo Soares",
        avatar: "https://avatars1.githubusercontent.com/u/33163249?s=460&u=a6f544acfbc594b51d3d776f8d92524bf8e2e9f5&v=4",
        whatsapp:"3171101736",
        bio: "Professor de Fisica",
    }

    classValue = {
        subject: "1",
        cost: "20",
        //proffy_id vira pelo banco de dados
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues});

    //Consultar os dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedProffys);

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffyS.id)
        WHERE classes.proffy_id = 1;
    `);

    // console.log(selectClassesAndProffys);

    // O horário que a pessoa trabalha, por exemplo é das 8h - 18h
    // o horário do time_from (8h) precisa ser antes ou igual ao solicitado, o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = class_id
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "420"
        AND class_schedule.time_to > "1300"
    `);

    // console.log(selectClassesSchedules);
})