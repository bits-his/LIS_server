-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2020 at 07:18 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lis`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_date` date NOT NULL,
  `department_code` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_date`, `department_code`, `description`, `location`) VALUES
('2020-08-22', '1', 'ds', 'dc'),
('2020-08-22', '2', 'dssds', 'r');

-- --------------------------------------------------------

--
-- Table structure for table `departments_units`
--

CREATE TABLE `departments_units` (
  `department_code` varchar(100) NOT NULL,
  `unit_name` varchar(100) NOT NULL,
  `unit_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `letter_template`
--

CREATE TABLE `letter_template` (
  `template_date` date NOT NULL,
  `department` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `purpose` varchar(200) NOT NULL,
  `letter_body` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `registry`
--

CREATE TABLE `registry` (
  `Acknolegment_id` varchar(100) NOT NULL,
  `registry_date` date NOT NULL,
  `tag_no` varchar(20) NOT NULL,
  `images` blob NOT NULL,
  `remarks` varchar(2000) NOT NULL,
  `inserted_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registry`
--

INSERT INTO `registry` (`Acknolegment_id`, `registry_date`, `tag_no`, `images`, `remarks`, `inserted_by`) VALUES
('12345', '2020-08-22', 'nass/12345', '', 'Very nice', '');

-- --------------------------------------------------------

--
-- Table structure for table `remarks`
--

CREATE TABLE `remarks` (
  `remarks_id` int(8) NOT NULL,
  `tag_no` varchar(20) NOT NULL,
  `remarks` varchar(4000) NOT NULL,
  `remarks_by` varchar(50) NOT NULL,
  `date_of_remarks` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site_file`
--

CREATE TABLE `site_file` (
  `site_file_date` date NOT NULL,
  `site_no` varchar(100) NOT NULL,
  `compensation_purpose` varchar(100) NOT NULL,
  `remarks` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_code`);

--
-- Indexes for table `departments_units`
--
ALTER TABLE `departments_units`
  ADD PRIMARY KEY (`unit_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
