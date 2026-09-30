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
        flag: "🇯🇵",
        userId: "user_test_001",
      },
      {
        title: "Rossiya",
        location: "Yevroosiyo",
        size: 17098246,
        flag: "🇷🇺",
        userId: "user_test_001",
      },
      {
        title: "O'zbekiston",
        location: "Markaziy Osiyo",
        size: 448978,
        flag: "🇺🇿",
        userId: "user_test_001",
      },
      {
        title: "Fransiya",
        location: "G'arbiy Yevropa",
        size: 551695,
        flag: "🇫🇷",
        userId: "user_test_001",
      },
      {
        title: "Germaniya",
        location: "Markaziy Yevropa",
        size: 357592,
        flag: "🇩🇪",
        userId: "user_test_001",
      },
      {
        title: "Angliya",
        location: "Shimoliy Yevropa",
        size: 243610,
        flag: "🇬🇧",
        userId: "user_test_001",
      },
      {
        title: "Italiya",
        location: "Janubiy Yevropa",
        size: 301340,
        flag: "🇮🇹",
        userId: "user_test_001",
      },
      {
        title: "Turkiya",
        location: "Yevroosiyo ko'prigi",
        size: 783562,
        flag: "🇹🇷",
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
