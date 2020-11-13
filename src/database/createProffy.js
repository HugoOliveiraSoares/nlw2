module.exports = async function (db, {proffyValue, classValue, classScheduleValues}) {
    //Inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);

    const proffy_id = insertedProffy.lastID;

    // Inserir dados na tabela de classes
    const insertdClasses = await db.run(`
            INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `);

    const class_id = insertdClasses.lastID;

    // Inserir dados na tabela de class_schedule
    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValues) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValues.weekday}",
                "${classScheduleValues.time_from}",
                "${classScheduleValues.time_to}"
            );
        `);
    })

    //Executar todos os db.run() das class_schedules
    await Promise.all(insertedAllClassesScheduleValues);
    
}