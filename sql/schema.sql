-- schema.sql (final version, fixed)

CREATE TABLE Branches (
  BranchCode VARCHAR(50) PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Region VARCHAR(100),
  Division VARCHAR(100),
  HO VARCHAR(100)
);

CREATE TABLE Employees (
  EmpCode VARCHAR(50) PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  DOB DATE NOT NULL,
  BankName VARCHAR(100),
  IFSCCode VARCHAR(20),
  AccountNumber VARCHAR(30),
  BranchCode VARCHAR(50),
  FOREIGN KEY (BranchCode) REFERENCES Branches(BranchCode) ON DELETE SET NULL
);

CREATE TABLE Attendance (
  ID INT PRIMARY KEY IDENTITY(1,1),
  EmpCode VARCHAR(50),
  AttDate DATE NOT NULL,
  Status VARCHAR(20) CHECK (Status IN ('Present', 'Absent', 'Leave', 'Half Day')),
  FOREIGN KEY (EmpCode) REFERENCES Employees(EmpCode) ON DELETE CASCADE
);

CREATE TABLE LeaveRequests (
  ID INT PRIMARY KEY IDENTITY(1,1),
  EmpCode VARCHAR(50),
  FromDate DATE NOT NULL,
  ToDate DATE NOT NULL,
  LeaveType VARCHAR(50),
  Reason VARCHAR(255),
  Status VARCHAR(20) DEFAULT 'Pending',
  FOREIGN KEY (EmpCode) REFERENCES Employees(EmpCode) ON DELETE CASCADE
);

CREATE TABLE TADA (
  ID INT PRIMARY KEY IDENTITY(1,1),
  EmpCode VARCHAR(50),
  FromDate DATE NOT NULL,
  ToDate DATE NOT NULL,
  Purpose VARCHAR(255),
  Amount DECIMAL(10,2) CHECK (Amount >= 0),
  FOREIGN KEY (EmpCode) REFERENCES Employees(EmpCode) ON DELETE CASCADE
);

CREATE TABLE Loans (
  ID INT PRIMARY KEY IDENTITY(1,1),
  EmpCode VARCHAR(50),
  LoanAmount DECIMAL(10,2) CHECK (LoanAmount > 0),
  EMI DECIMAL(10,2) CHECK (EMI >= 0),
  Purpose VARCHAR(255),
  StartDate DATE DEFAULT GETDATE(),
  FOREIGN KEY (EmpCode) REFERENCES Employees(EmpCode) ON DELETE CASCADE
);

CREATE TABLE Salary (
  ID INT PRIMARY KEY IDENTITY(1,1),
  EmpCode VARCHAR(50),
  SalaryMonth VARCHAR(10) NOT NULL,
  Basic DECIMAL(10,2) CHECK (Basic >= 0),
  HRA DECIMAL(10,2) CHECK (HRA >= 0),
  Deductions DECIMAL(10,2) CHECK (Deductions >= 0),
  NetPay AS (Basic + HRA - Deductions) PERSISTED,
  FOREIGN KEY (EmpCode) REFERENCES Employees(EmpCode) ON DELETE CASCADE
);

CREATE TABLE Resignations (
  ID INT PRIMARY KEY IDENTITY(1,1),
  EmpCode VARCHAR(50),
  ResignationDate DATE NOT NULL,
  Reason VARCHAR(255),
  FOREIGN KEY (EmpCode) REFERENCES Employees(EmpCode) ON DELETE CASCADE
);

CREATE TABLE Users (
  UserID INT PRIMARY KEY IDENTITY(1,1),
  Username VARCHAR(50) UNIQUE NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  Role VARCHAR(20) CHECK (Role IN ('Admin', 'HR', 'Manager', 'Employee')) NOT NULL
);
