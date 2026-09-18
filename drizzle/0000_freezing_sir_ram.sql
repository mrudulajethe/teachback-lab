CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`mission_id` text NOT NULL,
	`explanation_hash` text NOT NULL,
	`revisions` integer DEFAULT 0 NOT NULL,
	`mode` text NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `attempts_learner_created` ON `attempts` (`learner_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `learners` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `progress` (
	`learner_id` text NOT NULL,
	`mission_id` text NOT NULL,
	`stars` integer NOT NULL,
	`completed_at` integer NOT NULL,
	PRIMARY KEY(`learner_id`, `mission_id`),
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
