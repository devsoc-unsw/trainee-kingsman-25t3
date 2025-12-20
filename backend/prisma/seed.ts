import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding guilds...");

  const guilds = [
    {
      name: "The Focused Warriors",
      description:
        "A guild dedicated to productivity and focus. Join us in completing tasks and achieving our goals together!",
      goal_tasks: 100,
      current_tasks: 0,
      completed: false,
    },
    {
      name: "The Task Masters",
      description:
        "Elite group of task completers. We strive for excellence in every task we undertake.",
      goal_tasks: 150,
      current_tasks: 0,
      completed: false,
    },
    {
      name: "The Productivity League",
      description:
        "Unite with fellow productivity enthusiasts. Together we can accomplish great things!",
      goal_tasks: 100,
      current_tasks: 0,
      completed: false,
    },
    {
      name: "The Achievement Seekers",
      description:
        "Join us on a journey of continuous improvement and task completion. Every task counts!",
      goal_tasks: 120,
      current_tasks: 0,
      completed: false,
    },
    {
      name: "The Goal Crushers",
      description:
        "We crush goals and complete tasks with determination. Ready to join the crusade?",
      goal_tasks: 200,
      current_tasks: 0,
      completed: false,
    },
  ];

  for (const guildData of guilds) {
    const existingGuild = await prisma.guild.findFirst({
      where: { name: guildData.name },
    });

    if (!existingGuild) {
      await prisma.guild.create({
        data: guildData,
      });
      console.log(`Created guild: ${guildData.name}`);
    } else {
      console.log(`Guild already exists: ${guildData.name}`);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




