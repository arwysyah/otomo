-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 03, 2020 at 09:39 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `otomo`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id_article` int(12) NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id_article`, `title`, `image`) VALUES
(1, 'Merayakan imlek dengan tradisi Grebeg Sudiro, Solo\r\n\r\n', 'https://blogautomo.files.wordpress.com/2020/01/tirtoid-antarafoto-kirab-grebeg-sudiro-220117-yud-1_ratio-16x9-1.jpg?w=1024'),
(2, 'Perawatan Pasca Terendam Banjir', 'https://blogautomo.files.wordpress.com/2020/01/5e0cd5a8a00a8-mobil-terendam-banjir_100kpj.jpg'),
(3, 'Tradisi Unik Perayaan Tahun Baru di Berbagai Kota di Indonesia', 'https://blogautomo.files.wordpress.com/2019/12/gettyimages-506125280-2048x2048-1.jpg?w=2000&h=1200&crop=1');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` int(4) NOT NULL,
  `product_name` text NOT NULL,
  `image` text NOT NULL,
  `price` int(12) NOT NULL,
  `description` text NOT NULL,
  `category` text NOT NULL,
  `rules` text NOT NULL,
  `location` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `fuel` varchar(16) NOT NULL,
  `hoursperDay` int(16) NOT NULL,
  `max_Capacity` int(5) NOT NULL,
  `max_secCapacity` int(12) NOT NULL,
  `toll_parkingCharge` varchar(20) NOT NULL,
  `deposit` varchar(20) NOT NULL,
  `insurance` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `product_name`, `image`, `price`, `description`, `category`, `rules`, `location`, `latitude`, `longitude`, `fuel`, `hoursperDay`, `max_Capacity`, `max_secCapacity`, `toll_parkingCharge`, `deposit`, `insurance`) VALUES
(1, 'Toyota Innova s', 'https://otomo.co/media/cache/listing_xxlarge/uploads/listings/images/b7a523d9da6f8453de2323c07ec2c8c572842afc.png', 1000000, 'Toyota Innova + Driver + Gasoline\r\nExclude toll, parking & entrance fee\r\nService area - Yogyakarta ( inside city)', 'Car', 'overtime will be charge 10% per hour', 'Yogyakarta', -7.797068, 110.370529, 'Included', 12, 6, 1, 'Not Included', 'No', 'Not Included'),
(2, 'Mitsubishi Pajero', 'https://otomo.co/media/cache/listing_xxlarge/uploads/listings/images/3ca0d5f9f0301eb51c0c56ea82485ac3a817ce1b.jpg', 3000000, 'https://otomo.co/media/cache/listing_xxlarge/uploads/listings/images/3ca0d5f9f0301eb51c0c56ea82485ac3a817ce1b.jpg', 'Car', 'overtime will be charge 10% per hour', 'Bali', -8.65, 115.216667, 'Not Included', 12, 6, 1, 'Not Included', 'No', 'Not Included'),
(3, 'Isuzu Elf Sport', 'https://otomo.co/media/cache/listing_xxlarge/uploads/listings/images/b2ebdc9cadb39ba16ba915977a3aac76ce44d0aa.png', 2000000, 'Isuzu Elf Short + Driver\r\nExclude Toll, Parking, Gasoline & Entrance Fee\r\nService area - Jakarta & surrounding', 'Car', 'Isuzu Elf Short + Driver\r\nExclude Toll, Parking, Gasoline & Entrance Fee\r\nService area - Jakarta & surrounding', 'Jakarta', -6.1989557, 106.8409081, 'Not Included', 12, 10, 15, 'Not Included', 'No', 'Not Included'),
(4, 'Daihatsu Xenia', 'https://otomo.co/media/cache/listing_xxlarge/uploads/listings/images/30febadb9becbf3a8d5dbbfb0c9d2b1bfe52cff0.png', 580000, 'Daihatsu Xenia 2016 + Driver\nExclude Toll, Parking, Gasoline & Entrance Fee\nService area - Jakarta & surrounding', 'Car', 'overtime will be charge 10% per hour', 'Medan', 3.5852872, 98.6651813, 'Not Included', 12, 6, 1, 'Not Included', 'No', 'Not Included');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id_transaction` int(12) NOT NULL,
  `id_product` int(12) NOT NULL,
  `product_name` text NOT NULL,
  `image` text NOT NULL,
  `price` int(20) NOT NULL,
  `location` text NOT NULL,
  `total` int(20) NOT NULL,
  `start_date` varchar(30) NOT NULL,
  `end_date` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id_transaction`, `id_product`, `product_name`, `image`, `price`, `location`, `total`, `start_date`, `end_date`) VALUES
(5, 4, 'Daihatsu Xenia', 'https://otomo.co/media/cache/listing_xxlarge/uploads/listings/images/30febadb9becbf3a8d5dbbfb0c9d2b1bfe52cff0.png', 580000, 'Medan', 1740000, '2020-02-03T17:00:00.000Z', '2020-02-05T17:00:00.000Z');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(16) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `password`) VALUES
(1, 'arwysyah', 'arwy@gmail.com', '$2b$10$3tKwTFevTG9ZjGg5hKniR.CGE2S2RCCZo5iLq3w7qqe5R2GcQfdKe'),
(2, 'arwy', 'arwysyah@gmail.com', '$2b$10$X40sLpLV36HDW7ZfuMR9xOTdB5PEHcK6xiFWlotPC.k3Lghyc76tG'),
(3, 'kenzo', 'kenzo@gmail.com', '$2b$10$hZoGbxhiLlf.ut9uxazg/OA3zkMLyuoccc5AmG7fU5Mlopkwvh/By'),
(4, 'arkademy', 'arkademy@gmail.com', '$2b$10$eUs03NJpyA6FvMAjD6ww3.tC2YVZviJ1UIAV18cU7MFXCzc1lnZqi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id_transaction`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id_transaction` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
