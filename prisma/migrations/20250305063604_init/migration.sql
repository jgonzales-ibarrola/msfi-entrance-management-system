-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "emp_no" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "date_hired" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeLog" (
    "id" SERIAL NOT NULL,
    "time_in" TIMESTAMP(3) NOT NULL,
    "time_out" TIMESTAMP(3),
    "employeeNo" TEXT NOT NULL,
    "isRestricted" BOOLEAN NOT NULL,

    CONSTRAINT "EmployeeLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_emp_no_key" ON "Employee"("emp_no");

-- AddForeignKey
ALTER TABLE "EmployeeLog" ADD CONSTRAINT "EmployeeLog_employeeNo_fkey" FOREIGN KEY ("employeeNo") REFERENCES "Employee"("emp_no") ON DELETE CASCADE ON UPDATE CASCADE;
