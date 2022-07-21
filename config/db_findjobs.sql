-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 21, 2022 at 10:58 AM
-- Server version: 10.4.24-MariaDB-cll-lve
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bilkanet_findjobs`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `technology` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creatorId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salaryMin` decimal(9,2) DEFAULT NULL,
  `salaryMax` decimal(9,2) DEFAULT NULL,
  `lat` decimal(10,7) DEFAULT NULL,
  `lon` decimal(10,7) DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `description`, `email`, `technology`, `address`, `title`, `image`, `name`, `creatorId`, `salaryMin`, `salaryMax`, `lat`, `lon`, `date`) VALUES
('2b8f5ad2-6245-4302-805d-39d617bbdcce', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'python@coco.pl', 'python,django', 'Szczęśliwa 3, 80-176 Gdańsk, Polska', 'CoCO python machine learning', 'uploads\\images\\135fe1f4-70f6-48f1-8d74-a9bc2179bf9e.png', 'CoCo', '1478bd99-4626-4413-8702-80a7f99376ad', '123.00', '123.00', '54.3511122', '18.5255688', '2022-01-02'),
('2f9d2fd1-6967-41ce-9f1c-e89f6efdb2a5', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'react@test.pl', 'react,js', 'plac Zamkowy 4, 00-277 Warszawa, Polska', 'Junior front-end react dev', 'uploads\\images\\c9544e32-b63e-4d1e-8e8f-4ff7a542c7f8.png', 'Reactor', 'c6c8226d-66df-4f02-9d7c-50353b5c5390', '11.00', '11.00', '52.2478816', '21.0152917', '2022-01-22'),
('657688de-d5ed-4f68-9b33-1534c231f727', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'senior@sss.pl', 'java, kotlin, docker', '3 Maja 30, 40-097 Katowice, Polska', 'Senior java developer', 'uploads\\images\\7a4ddf6d-0fce-4cdf-83a4-7b7f286957b4.png', 'ShoperC', 'c6c8226d-66df-4f02-9d7c-50353b5c5390', '111.00', '222.00', '50.2588718', '19.0169113', '2021-11-22'),
('9208e28a-98ab-4627-abab-40e4c214aeb6', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'birds@birds.com', 'c##', 'Graniczna 85, 54-530 Wrocław, Polska', 'C## dev', 'uploads\\images\\891df242-2867-4752-a536-bc9c5ff396f5.png', 'Brids', '1478bd99-4626-4413-8702-80a7f99376ad', '12.00', '199.00', '51.1091453', '16.9146976', '2021-01-11'),
('970f86b5-eab2-450c-9548-44433d421de8', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'basia-crop@wp.pl', 'c++,c##', 'Henryka Sienkiewicza 2, 41-200 Sosnowiec, Polska', 'C++ dev', 'uploads\\images\\c98eb7ac-8526-4f99-8932-66deaa52fbcb.png', 'BasiaCor', '1478bd99-4626-4413-8702-80a7f99376ad', '1233.00', '1321.00', '50.2751547', '19.1269720', '2021-01-17'),
('9ddf5fbc-6351-4718-af90-a27d46312b19', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'jstest@test.com', 'react,js,node,ts', 'polsa,kraków, kazimierza wielkiego 1', 'Full Stack Developer js, react', 'uploads\\images\\9a068432-ea96-4f8b-91c0-57d7b2890efb.png', 'Js test company', 'c6c8226d-66df-4f02-9d7c-50353b5c5390', '1.00', '2.00', '49.9743613', '19.8286122', '2021-01-23'),
('aa036c7f-088d-45b5-94c4-a7281b903ba2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'birds@birds.com', 'c++', 'Graniczna 190, 54-530 Wrocław, Polska', 'C++ developer', 'uploads\\images\\f5e052f6-8774-48be-a79d-8e605b69d1e0.png', 'Birds ', '1478bd99-4626-4413-8702-80a7f99376ad', '12.00', '13.00', '51.1095860', '16.8800220', '2021-01-25'),
('bb6ebd57-2f8f-4699-9f4c-f2c837d65a5b', 'tester company ', 'tester@gmail.com', 'Node, react, java', 'Kraków, mariacka', 'Tester company', 'uploads/images/ee89e174-7137-4765-b3b0-9ad6e5f49b53.png', 'Tester Company', '22191e44-9252-401e-9750-d0961774136c', '12.00', '15.00', '50.0616547', '19.9394485', '2022-06-20'),
('edb66818-a226-4a53-bbf9-4a90eaf9f530', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'jeson@jeson.pl', 'js,ts', 'Ignacew 9, 95-050 Konstantynów Łódzki, Polska', 'JavaScript dev', 'uploads\\images\\ad154687-33c5-4510-b3a0-8181e2ba0e91.png', 'Jejson', '1478bd99-4626-4413-8702-80a7f99376ad', '123.00', '155.00', '51.7648178', '19.2682067', '2021-01-16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
('1478bd99-4626-4413-8702-80a7f99376ad', 'Basia', 'basia@gmail.com', '$2b$12$tbjROssmdQEB29/79ffFdOqjloNUEQg/7tzaHjLE.KxQ0SyJuhqnq'),
('22191e44-9252-401e-9750-d0961774136c', 'Tester', 'test123@gmail.com', '$2b$12$.zg3LtfZ.dkDWOWuB/YqwuBpW9p6jyLpy8LdyhU81ih2iUf0fDfuu'),
('98afa2d2-a14d-4437-93c6-c17e7d2d32b4', 'marcin', 'test@test.com', '$2b$12$c7zZIBcfmb8Lu6oaFaZUsuDbudgDDy5b6/X6x3OSeBmdtE.f2vbXC'),
('c6c8226d-66df-4f02-9d7c-50353b5c5390', 'bilkadev', 'bilkadev@gmail.com', '$2b$12$Z40tpkp24IUPxmEfbvQb2Otbg1GJEDiqtTUOnBR37.o81AAtHXNze');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ads_users` (`creatorId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `FK_ads_users` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
