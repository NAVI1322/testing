import { prisma } from "../index";

export const getApplicationsByRecruiter = async (recruiterId: string) => {
  try {
    const jobsWithApplications = await prisma.availableJobRecruiter.findMany({
      where: { recruiterId },
      include: {
        availableJob: {
          include: {
            jobDescription: true,
            applications: {
              include: {
                employee: true, // Fetch employee details
              },
            },
          },
        },
      },
    });

    // Transform data into a user-friendly format
    return jobsWithApplications.map((jobRecord) => ({
      jobId: jobRecord.availableJob.id,
      jobName: jobRecord.availableJob.jobDescription?.jobName || "N/A",
      location: jobRecord.availableJob.jobDescription?.location || "N/A",
      applications: jobRecord.availableJob.applications.map((app) => ({
        applicationId: app.id,
        appliedAt: app.appliedAt || null,
        status: app.status || "No applications",
        employee: app.employee
          ? {
              firstName: app.employee.firstName,
              lastName: app.employee.lastName,
              email: app.employee.email,
            }
          : null, // Handle cases where no employee is associated
      })),
    }));
  } catch (error) {
    console.error("Error fetching applications by recruiter:", error);
    throw new Error("Failed to fetch applications.");
  }
};