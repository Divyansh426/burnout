CREATE TABLE `creators` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`branch` varchar(255),
	`post` varchar(255),
	`photo_url` varchar(512),
	`message` text,
	`instagram` varchar(512),
	`linkedin` varchar(512),
	`kind` enum('mentor','creator') NOT NULL DEFAULT 'creator',
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `creators_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hot_events` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`instagram_reel` varchar(512),
	`poster_image_key` varchar(512),
	`event_date` varchar(100),
	`venue` varchar(255),
	`show_on_homepage` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hot_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboard_entries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`team_name` varchar(255) NOT NULL,
	`prefinal_qualified` boolean NOT NULL DEFAULT false,
	`prefinal_position` int NOT NULL DEFAULT 0,
	`prefinal_points` int NOT NULL DEFAULT 0,
	`final_qualified` boolean NOT NULL DEFAULT false,
	`final_position` int NOT NULL DEFAULT 0,
	`final_points` int NOT NULL DEFAULT 0,
	`durability` int NOT NULL DEFAULT 0,
	`manoeuvrability` int NOT NULL DEFAULT 0,
	`technical` int NOT NULL DEFAULT 0,
	`mixed_bonus` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leaderboard_entries_id` PRIMARY KEY(`id`),
	CONSTRAINT `leaderboard_entries_team_name_unique` UNIQUE(`team_name`)
);
--> statement-breakpoint
CREATE TABLE `payment_settings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`upi_id` varchar(255),
	`account_number` varchar(100),
	`ifsc` varchar(20),
	`bank_name` varchar(255),
	`account_holder` varchar(255),
	`qr_image_key` varchar(512),
	`registration_fee` varchar(50),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payment_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`team_name` varchar(255) NOT NULL,
	`leader_name` varchar(255) NOT NULL,
	`leader_roll` varchar(50) NOT NULL,
	`leader_branch` varchar(255) NOT NULL,
	`leader_phone` varchar(20) NOT NULL,
	`second_member_phone` varchar(20),
	`leader_email` varchar(320),
	`member1_name` varchar(255),
	`member1_roll` varchar(50),
	`member1_branch` varchar(255),
	`member2_name` varchar(255),
	`member2_roll` varchar(50),
	`member2_branch` varchar(255),
	`member3_name` varchar(255),
	`member3_roll` varchar(50),
	`member3_branch` varchar(255),
	`member4_name` varchar(255),
	`member4_roll` varchar(50),
	`member4_branch` varchar(255),
	`payment_screenshot_key` varchar(512),
	`transaction_ref` varchar(255),
	`status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`admin_note` varchar(512),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sponsors` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`tagline` varchar(255),
	`link` varchar(512),
	`logo_url` varchar(512),
	`tier` enum('big','small') NOT NULL DEFAULT 'small',
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `sponsors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`post` varchar(255) NOT NULL,
	`branch` varchar(255),
	`photo_url` varchar(512),
	`instagram` varchar(255),
	`linkedin` varchar(512),
	`email` varchar(320),
	`group_name` enum('faculty','postholders') NOT NULL DEFAULT 'postholders',
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`passwordHash` varchar(255),
	`avatar` text,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;