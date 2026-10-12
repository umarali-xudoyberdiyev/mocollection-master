const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.davlat.deleteMany();
  await prisma.davlat.createMany({
    data: [
      {
        title: "Yaponiya",
        location: "Sharqiy Osiyo",
        size: 377975,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "Rossiya",
        location: "Yevroosiyo",
        size: 17098246,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "O'zbekiston",
        location: "Markaziy Osiyo",
        size: 448978,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "Fransiya",
        location: "G'arbiy Yevropa",
        size: 551695,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "Germaniya",
        location: "Markaziy Yevropa",
        size: 357592,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "Angliya",
        location: "Shimoliy Yevropa",
        size: 243610,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "Italiya",
        location: "Janubiy Yevropa",
        size: 301340,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
      {
        title: "Turkiya",
        location: "Yevroosiyo ko'prigi",
        size: 783562,
        maslahatBeraman: true,
        userId: "user_test_001",
      },
    ],
  });

  console.log("Seed data muvaffaqiyatli qo'shildi");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
