-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2022 at 06:53 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `premission` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `premission`) VALUES
(1, 'dd', 'dd', 'user1@gmail.com', 'user1@gmail.com', 'allow'),
(2, 'sdfsd', 'sdfds', 'user1@gmail.com', 'user1@gmail.com', ''),
(3, 'gg', 'sdfds', 'user1@gmail.com', 'user1@gmail.com', ''),
(4, '78', '4', 'user1@gmail.com', 'user1@gmail.com', 'allow'),
(5, 'sdf', 'df', 'user1@gmail.com', 'user1@gmail.com', ''),
(6, 'sdfs', 'sdf', 'user1@gmail.com', 'user1@gmail.com', 'allow'),
(7, 'sdf', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(8, 'sdfs', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(9, 'jasvir', 'singh', 'user1@gmail.com', 'user1@gmail.com', 'allow'),
(10, 'sdf', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(11, 'sdf', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(12, 'sdf', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(13, 'sdf', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(14, 'sdfs', 'sdf', 'user1@gmail.com', 'user1@gmail.com', ''),
(15, 'ddd', 'dsf', 'user1@gmail.com', 'user1@gmail.com', ''),
(16, 'singh', '005', 'singh@gmail.com', 'singh@gmail.com', 'allow');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
