-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2025 at 11:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tp3`
--

-- --------------------------------------------------------

--
-- Table structure for table `petition`
--

CREATE TABLE `petition` (
  `IDP` int(11) NOT NULL,
  `TitreP` varchar(50) NOT NULL,
  `DescriptionP` text DEFAULT NULL,
  `DateAjoutP` date NOT NULL,
  `DateFinP` date NOT NULL,
  `NomPorteurP` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `emailU` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `petition`
--

INSERT INTO `petition` (`IDP`, `TitreP`, `DescriptionP`, `DateAjoutP`, `DateFinP`, `NomPorteurP`, `Email`, `emailU`) VALUES
(1, 'Stop Plastic Pollution', 'A petition to ban single-use plastics in the city to protect marine life and reduce waste.', '2025-09-10', '2025-12-10', 'Leila Amrani', 'leila.amrani@example.com', NULL),
(2, 'Save Local Forests', 'Requesting the protection of local forests from deforestation and illegal logging.', '2025-08-15', '2025-11-15', 'Karim Bouziane', 'karim.bouziane@example.com', NULL),
(3, 'Improve Public Transport', 'Petition for expanding the tramway network and introducing eco-friendly buses.', '2025-07-01', '2025-10-31', 'Amine El Idrissi', 'amine.elidrissi@example.com', NULL),
(4, 'Support Animal Shelters', 'Help fund animal shelters and provide better care for stray animals in our city.', '2025-06-20', '2025-12-31', 'Nadia Belkadi', 'nadia.belkadi@example.com', NULL),
(5, 'Ban Nighttime Construction Noise', 'Petition to restrict noisy construction work between 10 PM and 6 AM for better sleep quality.', '2025-10-01', '2025-11-30', 'Youssef Haddad', 'youssef.haddad@example.com', NULL),
(6, 'Clean City Initiative', 'Encourage citizens to keep public spaces clean and green.', '2025-08-01', '2025-12-31', 'Omar Benali', 'omar.benali@example.com', NULL),
(7, 'Digital Literacy for All', 'Campaign to offer free basic computer courses for adults.', '2025-07-10', '2025-11-10', 'Amina Tazi', 'amina.tazi@example.com', NULL),
(8, 'Save the Atlas Mountains', 'Preserve biodiversity and protect the Atlas ecosystem.', '2025-06-15', '2025-12-15', 'Youssef El Fassi', 'youssef.elfassi@example.com', NULL),
(9, 'Reduce School Fees', 'Petition to reduce the cost of school enrollment for low-income families.', '2025-09-01', '2025-11-30', 'Salma Rahali', 'salma.rahali@example.com', NULL),
(10, 'Plant a Million Trees', 'Join hands to plant one million trees across the country.', '2025-05-05', '2025-12-05', 'Khalid Mourad', 'khalid.mourad@example.com', NULL),
(11, 'Ban Plastic Bottles', 'Replace single-use plastic bottles with eco-friendly alternatives.', '2025-06-01', '2025-12-31', 'Nadia Farah', 'nadia.farah@example.com', NULL),
(12, 'Improve University Wi-Fi', 'Enhance campus internet speed and coverage.', '2025-09-10', '2025-12-10', 'Reda Mansouri', 'reda.mansouri@example.com', NULL),
(13, 'Animal Rights Awareness', 'Promote awareness campaigns about animal cruelty and rights.', '2025-08-20', '2025-12-20', 'Laila Ait Lahcen', 'laila.lahcen@example.com', NULL),
(14, 'Support Renewable Energy', 'Encourage investments in solar and wind energy sources.', '2025-07-01', '2025-11-01', 'Hamza Idrissi', 'hamza.idrissi@example.com', NULL),
(15, 'Stop Deforestation', 'Petition to protect forests from illegal logging and fires.', '2025-05-10', '2025-11-10', 'Fatima Zahra', 'fatima.zahra@example.com', NULL),
(16, 'Equal Pay for Women', 'Call for gender equality in workplace salaries.', '2025-09-05', '2025-12-05', 'Meriem El Alaoui', 'meriem.alaoui@example.com', NULL),
(17, 'Clean Ocean Movement', 'Fight against ocean plastic pollution and support recycling.', '2025-06-22', '2025-12-22', 'Younes Essaid', 'younes.essaid@example.com', NULL),
(18, 'Improve Public Hospitals', 'Demand better hygiene and services in public hospitals.', '2025-07-25', '2025-11-25', 'Houda Amrani', 'houda.amrani@example.com', NULL),
(19, 'Tech for Rural Areas', 'Provide access to modern technology for rural communities.', '2025-08-10', '2025-12-10', 'Anass Karim', 'anass.karim@example.com', NULL),
(20, 'Promote Local Tourism', 'Encourage local tourism through digital campaigns.', '2025-07-15', '2025-11-15', 'Hajar Bensaid', 'hajar.bensaid@example.com', NULL),
(21, 'Road Safety Now', 'Implement stricter laws to reduce traffic accidents.', '2025-09-12', '2025-12-12', 'Ilyas Dadi', 'ilyas.dadi@example.com', NULL),
(22, 'Save Water Resources', 'Promote water conservation through education.', '2025-06-10', '2025-11-10', 'Sara Bouhadi', 'sara.bouhadi@example.com', NULL),
(23, 'Youth Employment Program', 'Create new job opportunities for young graduates.', '2025-05-20', '2025-11-20', 'Othmane Rifi', 'othmane.rifi@example.com', NULL),
(24, 'Free Public Libraries', 'Establish accessible libraries in every district.', '2025-07-18', '2025-11-18', 'Zineb Akil', 'zineb.akil@example.com', NULL),
(25, 'Green Public Transport', 'Support hybrid and electric buses in cities.', '2025-06-30', '2025-12-30', 'Ali Bennani', 'ali.bennani@example.com', NULL),
(26, 'Affordable Housing', 'Demand more affordable housing options for citizens.', '2025-07-22', '2025-12-22', 'Mouna Tahiri', 'mouna.tahiri@example.com', NULL),
(27, 'Support Mental Health', 'Raise awareness about mental health and fund clinics.', '2025-09-02', '2025-12-02', 'Adil Chraibi', 'adil.chraibi@example.com', NULL),
(28, 'School Nutrition Program', 'Introduce healthy meal plans in schools.', '2025-08-01', '2025-11-01', 'Rania Lamrani', 'rania.lamrani@example.com', NULL),
(29, 'Promote Local Artisans', 'Encourage the sale and promotion of local crafts.', '2025-05-30', '2025-11-30', 'Hicham Toumi', 'hicham.toumi@example.com', NULL),
(30, 'Digital Government Services', 'Speed up online access to public administration.', '2025-07-12', '2025-12-12', 'Omar Ahriz', 'omar.ahriz@example.com', NULL),
(31, 'Recycling in Schools', 'Add recycling bins and awareness programs in schools.', '2025-06-18', '2025-12-18', 'Imane Kabbaj', 'imane.kabbaj@example.com', NULL),
(32, 'Clean Beaches Project', 'Organize monthly beach clean-up campaigns.', '2025-07-28', '2025-12-28', 'Samir Fikri', 'samir.fikri@example.com', NULL),
(33, 'Safer Online Spaces', 'Regulate online harassment and promote digital ethics.', '2025-09-15', '2025-12-15', 'Aya Gharbi', 'aya.gharbi@example.com', NULL),
(34, 'Eco-Friendly Packaging', 'Encourage industries to use biodegradable packaging.', '2025-05-25', '2025-12-25', 'Rachid Belhaj', 'rachid.belhaj@example.com', NULL),
(35, 'Better Waste Management', 'Improve city waste collection and recycling centers.', '2025-06-05', '2025-11-05', 'Sanae Idrissi', 'sanae.idrissi@example.com', NULL),
(36, 'Change the data shaw in the university ', 'we send this message to our director to inform him that we need and must and he should change the datashaw because it is his responsibility', '2025-10-22', '2025-10-31', 'amine el biyadi', 'aminebiyadi4@gmail.com', NULL),
(37, 'Change the data shaw in the university 777', 'kkk', '2025-10-23', '2026-08-12', 'amine el biyadi', 'aminebiyadi4@gmail.com', NULL),
(38, 'chihaja', '8888888888888888888', '2025-10-23', '2025-10-30', 'amine el biyadi', 'aminebiyadi4@gmail.com', NULL),
(39, 'chihajawwwwwwssssssss', 'dddddddddddddd', '2025-10-23', '2025-10-31', 'ddddd', 'd@gmail.com', NULL),
(40, 'MESSSI', 'WA BARCA', '2025-10-23', '2025-10-25', 'AMINE', 'ELBIYADI@GMAIL.COM', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `signature`
--

CREATE TABLE `signature` (
  `IDS` int(11) NOT NULL,
  `IDP` int(11) DEFAULT NULL,
  `NomS` varchar(50) NOT NULL,
  `PrenomS` varchar(50) NOT NULL,
  `PaysS` varchar(50) NOT NULL,
  `DateS` date NOT NULL DEFAULT current_timestamp(),
  `HeureS` time NOT NULL DEFAULT current_timestamp(),
  `EmailS` varchar(50) NOT NULL,
  `emailU` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signature`
--

INSERT INTO `signature` (`IDS`, `IDP`, `NomS`, `PrenomS`, `PaysS`, `DateS`, `HeureS`, `EmailS`, `emailU`) VALUES
(1, 1, 'Benali', 'Omar', 'Morocco', '2025-09-12', '10:15:00', 'omar.benali@example.com', NULL),
(2, 1, 'Smith', 'Anna', 'UK', '2025-09-13', '15:42:00', 'anna.smith@example.co.uk', NULL),
(3, 2, 'Lopez', 'Maria', 'Spain', '2025-09-01', '09:30:00', 'maria.lopez@example.es', NULL),
(4, 2, 'Rami', 'Soufiane', 'Morocco', '2025-09-02', '11:20:00', 'soufiane.rami@example.com', NULL),
(5, 3, 'Chen', 'Li', 'China', '2025-07-03', '14:05:00', 'li.chen@example.cn', NULL),
(6, 3, 'Johnson', 'Paul', 'USA', '2025-07-05', '16:55:00', 'paul.johnson@example.com', NULL),
(7, 4, 'Fatima', 'Zahra', 'Morocco', '2025-07-10', '09:00:00', 'fatima.zahra@example.com', NULL),
(8, 4, 'Williams', 'Emily', 'Canada', '2025-08-01', '13:15:00', 'emily.williams@example.ca', NULL),
(9, 5, 'Bennani', 'Hassan', 'Morocco', '2025-10-03', '18:40:00', 'hassan.bennani@example.com', NULL),
(11, 1, 'Ali', 'Karim', 'Morocco', '2025-08-02', '10:05:00', 'karim.ali@example.com', NULL),
(12, 1, 'Lopez', 'Maria', 'Spain', '2025-08-03', '14:40:00', 'maria.lopez@example.es', NULL),
(13, 1, 'Smith', 'John', 'UK', '2025-08-04', '16:30:00', 'john.smith@example.co.uk', NULL),
(14, 1, 'Nguyen', 'Lan', 'Vietnam', '2025-08-05', '18:20:00', 'lan.nguyen@example.vn', NULL),
(15, 1, 'Diallo', 'Fatou', 'Senegal', '2025-08-06', '11:10:00', 'fatou.diallo@example.sn', NULL),
(16, 2, 'Jones', 'Emily', 'USA', '2025-07-12', '13:00:00', 'emily.jones@example.com', NULL),
(17, 2, 'Hassan', 'Rania', 'Egypt', '2025-07-13', '09:20:00', 'rania.hassan@example.eg', NULL),
(18, 2, 'Perez', 'Carlos', 'Mexico', '2025-07-14', '10:50:00', 'carlos.perez@example.mx', NULL),
(19, 2, 'Ahmed', 'Ali', 'Sudan', '2025-07-15', '14:30:00', 'ali.ahmed@example.sd', NULL),
(20, 2, 'Khan', 'Aisha', 'Pakistan', '2025-07-16', '15:40:00', 'aisha.khan@example.pk', NULL),
(21, 3, 'Bennani', 'Hassan', 'Morocco', '2025-06-16', '09:00:00', 'hassan.bennani@example.com', NULL),
(22, 3, 'Lee', 'Soo', 'Korea', '2025-06-17', '10:10:00', 'soo.lee@example.kr', NULL),
(23, 3, 'Gomez', 'Laura', 'Argentina', '2025-06-18', '12:30:00', 'laura.gomez@example.ar', NULL),
(24, 3, 'Tanaka', 'Kenji', 'Japan', '2025-06-19', '17:20:00', 'kenji.tanaka@example.jp', NULL),
(25, 3, 'Omar', 'Zaki', 'Egypt', '2025-06-20', '08:45:00', 'zaki.omar@example.eg', NULL),
(26, 30, 'Dubois', 'Claire', 'France', '2025-07-01', '09:50:00', 'claire.dubois@example.fr', NULL),
(27, 30, 'Singh', 'Arjun', 'India', '2025-07-02', '11:30:00', 'arjun.singh@example.in', NULL),
(28, 30, 'Ndlovu', 'Themba', 'South Africa', '2025-07-03', '12:15:00', 'themba.ndlovu@example.za', NULL),
(29, 30, 'Haddad', 'Youssef', 'Morocco', '2025-07-04', '14:20:00', 'youssef.haddad@example.com', NULL),
(30, 30, 'Wilson', 'Kate', 'Australia', '2025-07-05', '16:00:00', 'kate.wilson@example.au', NULL),
(31, 5, 'elbiyadi', 'amine', 'Morocco', '2025-10-22', '17:07:39', 'aminebiyadi4@gmail.com', NULL),
(32, 33, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '17:25:14', 'aminebiyadi4@gmail.com', NULL),
(33, 21, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '17:27:51', 'aminebiyadi4@gmail.com', NULL),
(34, 12, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '17:36:45', 'aminebiyadi4@gmail.com', NULL),
(35, 13, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '17:38:42', 'aminebiyadi4@gmail.com', NULL),
(36, 33, 'amezian', 'oumaima', 'Morocco', '2025-10-22', '17:39:48', 'ameziane@gmail.com', NULL),
(37, 33, 'mohito', 'raihana', 'Italy', '2025-10-22', '17:41:13', 'mohito@gmail.com', NULL),
(38, 12, 'raissouni ', 'aya ', 'Morocco', '2025-10-22', '17:46:50', 'aya@gmail.com', NULL),
(39, 9, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '17:52:17', 'aminebiyadi4@gmail.com', NULL),
(40, 36, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '21:02:29', 'aminebiyadi4@gmail.com', NULL),
(41, 16, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-22', '21:06:07', 'aminebiyadi4@gmail.com', NULL),
(42, 1, 'raisouni', 'aya ', 'Morocco', '2025-10-22', '21:06:51', 'lhbiba@gmail.com', NULL),
(43, 1, 'aya', 'aya', 'Morocco', '2025-10-22', '21:08:14', 'aya@gmail.com', NULL),
(44, 36, 'lhbiba', 'aya ', 'Morocco', '2025-10-22', '21:11:41', 'commen@gmail.com', NULL),
(45, 5, 'aya', 'aya', 'Morocco', '2025-10-22', '21:15:07', 'Aya@gmail.com', NULL),
(46, 9, 'Raisouni', 'Aya', 'Morocco', '2025-10-22', '21:17:47', 'Aya@gmail.com', NULL),
(47, 21, 'Aya', 'Aya', 'Morocco', '2025-10-22', '21:21:01', 'Aya@gmail.com', NULL),
(48, 36, 'oumaima', 'oumaima', 'Monaco', '2025-10-22', '21:23:52', '123@gmail.com', NULL),
(49, 36, 'wyw', 'aya', 'Madagascar', '2025-10-22', '21:24:15', 'sda@gmail.com', NULL),
(50, 36, 'chi le3ba ', 'chi haja ', 'Madagascar', '2025-10-22', '21:51:35', 'wa@gmail.com', NULL),
(51, 1, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-23', '16:39:22', 'aminebiyadi4@gmail.com', NULL),
(52, 38, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-23', '20:13:44', 'aminebiyadi4@gmail.com', NULL),
(53, 37, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-23', '20:17:14', 'aminebiyadi4@gmail.com', NULL),
(54, 39, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-23', '20:18:03', 'aminebiyadi4@gmail.com', NULL),
(55, 37, 'wen', 'aya', 'Belgium', '2025-10-23', '21:10:27', 'zeen@gmail.com', NULL),
(56, 37, 'cv', 'cc ', 'Australia', '2025-10-23', '21:10:28', 'amine@gmail.com', NULL),
(57, 37, 'EL BIYADI', 'AMINE', 'Morocco', '2025-10-23', '21:12:49', 'aminebiyaRRdi4@gmail.com', NULL),
(58, 37, 'ACH AYDIRLWAHED', 'iwa', 'Morocco', '2025-10-23', '21:12:49', 'aminebiyadiE4@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `EmailU` varchar(50) NOT NULL,
  `passwordU` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`EmailU`, `passwordU`, `lastName`, `firstName`) VALUES
('aminebiyadi4@gmail.com', 'amine123', 'El Biyadi', 'Amine');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `petition`
--
ALTER TABLE `petition`
  ADD PRIMARY KEY (`IDP`),
  ADD KEY `emailU` (`emailU`);

--
-- Indexes for table `signature`
--
ALTER TABLE `signature`
  ADD PRIMARY KEY (`IDS`),
  ADD KEY `IDP` (`IDP`),
  ADD KEY `emailU` (`emailU`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`EmailU`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `petition`
--
ALTER TABLE `petition`
  MODIFY `IDP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `signature`
--
ALTER TABLE `signature`
  MODIFY `IDS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `petition`
--
ALTER TABLE `petition`
  ADD CONSTRAINT `petition_ibfk_1` FOREIGN KEY (`emailU`) REFERENCES `utilisateur` (`EmailU`);

--
-- Constraints for table `signature`
--
ALTER TABLE `signature`
  ADD CONSTRAINT `signature_ibfk_1` FOREIGN KEY (`IDP`) REFERENCES `petition` (`IDP`),
  ADD CONSTRAINT `signature_ibfk_2` FOREIGN KEY (`emailU`) REFERENCES `utilisateur` (`EmailU`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
