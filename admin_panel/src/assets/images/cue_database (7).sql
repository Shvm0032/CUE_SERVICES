-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2024 at 10:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cue_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `logo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`id`, `email`, `username`, `password`, `company_name`, `city`, `country`, `address`, `phone_number`, `logo`) VALUES
(1, 'admin@gmil.com', 'admin', 'admin', 'student portal', '', '', 'adfghhj jsdbkc sdkjc', '12346578', '8d34904bac46e65fe5452623d4f22e10.webp');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `course_id` int(255) NOT NULL,
  `course_hash_id` varchar(255) NOT NULL,
  `hash_id` varchar(255) NOT NULL,
  `array` text NOT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT '0',
  `cart_status` varchar(255) NOT NULL DEFAULT '1',
  `status` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_detail`
--

CREATE TABLE `course_detail` (
  `id` int(11) NOT NULL,
  `industries` varchar(255) NOT NULL,
  `speaker` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `certificate` text NOT NULL,
  `course_thumbail` text NOT NULL,
  `selling_option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`selling_option`)),
  `slug` varchar(255) NOT NULL,
  `hash_id` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_detail`
--

INSERT INTO `course_detail` (`id`, `industries`, `speaker`, `title`, `description`, `date`, `time`, `duration`, `certificate`, `course_thumbail`, `selling_option`, `slug`, `hash_id`, `status`) VALUES
(46, '13', '43', 'Disciplining and Terminating an Employee: What to ', '<h3><strong>Overview:</strong></h3><p>It’s inevitable: At some point you will have to discipline, or even terminate an employee. Establishing the necessary groundwork is critical in both instances. An unfair or poorly handled termination could put your business at significant risk and legal liability. Thorough preparation, documentation and execution work in your favor when you do it right (and against you when you don’t).</p><p>This webinar will help you learn and understand best practices of performance improvement plans, discipline and termination in connection with performance or conduct issues.</p><h3><strong>What will You Learn:</strong></h3><ul><li>Steps and precautions to take before the termination</li><li>Practical guidelines for avoiding legal pitfalls</li><li>Ways to conduct a proper, pain-free termination meeting</li><li>The legal thresholds you must meet when firing workers based on bad behavior or poor performance.</li><li>How to avoid (and defend yourself against) bias and retaliation claims made by departing employees.</li><li>How to avoid making mistakes when disciplining or terminating older workers and other \"protected class\" employees.</li><li>The special challenges presented by workers out on leave, from FMLA and USERRA to workers comp.</li><li>Best practices for writing disciplinary and termination documents</li><li>Best practices for implementing discipline and termination</li><li>Documenting discipline and termination meetings</li><li>Post-termination consideration</li></ul><h3><strong>Why Should You Attend:</strong></h3><p>Even the most skilled experienced employers will find disciplining and terminating workers who are underperforming or breaking the rules. The path to effective, appropriate discipline is strewn with so many pitfalls that often prove to be a trap for the unwary, including without limitation, failing to document all incidents regarding a discharge, firing an employee who has health or personal problems, or waiting until the employee’s performance has deteriorated past the point of no return to address it.</p><p>In this 90-minute webinar you will learn about current legal – and practical - dos and don\'ts of employee discipline and termination. You will leave this webinar with useful tools, including best practices for preparing, communicating, and documenting performance improvement plans for your workers. You will also learn how to avoid or defend yourself against bias and retaliation claims made by departing employees.</p><h3>Who Should Attend:</h3><ul><li>HR managers</li><li>Department heads and supervisors</li><li>Owners and managers of small businesses</li><li>HR professionals</li><li>Managers</li><li>Supervisors</li><li>Employee Relations Professionals</li><li>HR Administrators</li><li>Compliance Professionals</li><li>Senior Managers</li><li>CEO’s</li></ul><p><br></p>', '2024-02-14', '13:01', '90 ', '', '2696e38a3f7e2f6c2823_DiscipliningandTerminatinganEmployee.jpg', '[{\"id\":31,\"category\":\"Live Options\",\"name\":\"1 Attendee\",\"price\":\"185\"},{\"id\":32,\"category\":\"Live Options\",\"name\":\"\\t2 Attendees (Save $45)\",\"price\":\"325\"},{\"id\":33,\"category\":\"Live Options\",\"name\":\"3 Attendees (Get 3 On Demands FREE)\",\"price\":\"455\"},{\"id\":34,\"category\":\"Live Options\",\"name\":\"4 Attendees (Get 4 On Demands FREE)\",\"price\":\"565\"},{\"id\":35,\"category\":\"Live Options\",\"name\":\"5 Attendees (Get 5 On Demands FREE)\",\"price\":\"685\"},{\"id\":36,\"category\":\"Super Saver Options\",\"name\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"price\":\"815\"},{\"id\":37,\"category\":\"Super Saver Options\",\"name\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"price\":\"935\"},{\"id\":38,\"category\":\"Super Saver Options\",\"name\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"price\":\"1025\"},{\"id\":39,\"category\":\"Super Saver Options\",\"name\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"price\":\"1105\"},{\"id\":40,\"category\":\"Super Saver Options\",\"name\":\"10 Attendees (10 ODs & 10 Transcripts FREE)\",\"price\":\"1195\"},{\"id\":41,\"category\":\"Recording & Combos\",\"name\":\"On Demand\",\"price\":\"185\"},{\"id\":42,\"category\":\"Recording & Combos\",\"name\":\"e-Transcript\",\"price\":\"200\"},{\"id\":43,\"category\":\"Recording & Combos\",\"name\":\"Live + On Demand\",\"price\":\"275\"},{\"id\":44,\"category\":\"Recording & Combos\",\"name\":\"Live + e-Transcript\",\"price\":\"285\"},{\"id\":45,\"category\":\"Recording & Combos\",\"name\":\"Live + OD + e-Transcript\",\"price\":\"375\"}]', 'disciplining-and-terminating-an-employee-what-to', '', '0'),
(47, '13', '39', '2024 Independent Contract Rule by DOL - Deadline for March 11, 2024! Audits by DOL & NLRB are Creating Havoc for Employers!', '<p><strong>Learn How Misclassifications Can be a Legal Nightmare for Employers!</strong></p><p>The new independent contractor rule from the U.S. Department of Labor (DOL) could spark an increase in misclassification lawsuits and make businesses less likely to hire gig workers, according to some legal experts. The final rule restores an earlier standard that required companies to weigh a variety of economic factors together to determine whether a worker is an employee or an independent contractor. It will take effect on <strong>March 11, 2024.</strong></p><p>The new rule returns to a more employee-friendly standard, and it may usher in a wave of misclassification lawsuits under the Fair Labor Standards Act (FLSA). The current rule prescribes a five-factor test to guide the analysis, two of which were designated as “core factors” carrying more weight. if these two factors point in the same direction – an independent contractor – then it is likely that the worker is properly classified as an independent contractor. By contrast, the proposed six-factor totality test eschews any predetermined weighting. Rather, it requires that each factor be considered in light of the economic reality of the entire activity at issue.</p><p>It is critical for Employers and professionals to make decisions to be compliant based on the criteria. Join this webinar with HR Compliance Officer Margie Faulk where she covers all these criteria in details and how to be compliant with the new classification Rule by the DOL.</p><h3><strong>What will You Learn:</strong></h3><ul><li>How the Independent Contractor Rule will impact Employers and Independent Contractors</li><li>Why it is confusing to determine and define the requirements for IC status.</li><li>Learn about examples of employee vs Independent Contractors case studies.</li><li>How different this new rule is from the previous rule.</li><li>What the “proposed rules” include, and which proposal can make challenges for Employers and agents of employers like professionals involved in employee relations.</li><li>What the penalties are for violating classification regulations by the DOL, NLRB and IRS.</li><li>How the business communities are opposed to the new DOL Rule</li><li>What the best practices are when classifying employee vs independent contractors.</li><li>How long Employers have to put the new rule in place.</li><li>How Employers can effectively mitigate the proposed regulations.</li></ul><h3><strong>Why You should Attend:</strong></h3><p>Considering this heightened scrutiny and potential narrower legal standard, it is now more important than ever to evaluate how companies structure an independent contractor relationship. It is particularly important for employers to seek guidance from experienced counsel when developing and implementing policies related to working with independent contractors.</p><p>It should not be a strange test to employers. We’re back to where we were in the past. At the end of the day, it’s the courts that really have the power to make that determination about whether an employer misclassified a worker.</p><h3><strong>Who should Attend:</strong></h3><ul><li>All Employers</li><li>Business Owners</li><li>Company Leadership</li><li>Compliance professionals</li><li>Payroll Administrators</li><li>HR Professionals</li><li>Managers/Supervisors</li><li>Anyone Interested in Being Compliant with Current Regulations</li></ul><p><br></p>', '2024-02-15', '17:00', '90 ', '', '7a4c251632acc91ede07_IndependentContractRule.jpg', '[{\"id\":31,\"category\":\"Live Options\",\"name\":\"1 Attendee\",\"price\":\"185\"},{\"id\":32,\"category\":\"Live Options\",\"name\":\"\\t2 Attendees (Save $45)\",\"price\":\"325\"},{\"id\":33,\"category\":\"Live Options\",\"name\":\"3 Attendees (Get 3 On Demands FREE)\",\"price\":\"455\"},{\"id\":34,\"category\":\"Live Options\",\"name\":\"4 Attendees (Get 4 On Demands FREE)\",\"price\":\"565\"},{\"id\":35,\"category\":\"Live Options\",\"name\":\"5 Attendees (Get 5 On Demands FREE)\",\"price\":\"685\"},{\"id\":36,\"category\":\"Super Saver Options\",\"name\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"price\":\"815\"},{\"id\":37,\"category\":\"Super Saver Options\",\"name\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"price\":\"935\"},{\"id\":38,\"category\":\"Super Saver Options\",\"name\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"price\":\"1025\"},{\"id\":39,\"category\":\"Super Saver Options\",\"name\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"price\":\"1105\"},{\"id\":40,\"category\":\"Super Saver Options\",\"name\":\"10 Attendees (10 ODs & 10 Transcripts FREE)\",\"price\":\"1195\"},{\"id\":41,\"category\":\"Recording & Combos\",\"name\":\"On Demand\",\"price\":\"185\"},{\"id\":42,\"category\":\"Recording & Combos\",\"name\":\"e-Transcript\",\"price\":\"200\"},{\"id\":43,\"category\":\"Recording & Combos\",\"name\":\"Live + On Demand\",\"price\":\"275\"},{\"id\":44,\"category\":\"Recording & Combos\",\"name\":\"Live + e-Transcript\",\"price\":\"285\"},{\"id\":45,\"category\":\"Recording & Combos\",\"name\":\"Live + OD + e-Transcript\",\"price\":\"375\"}]', '2024-independent-contract-rule-by-dol-deadline-for-march-11-2024-audits-by-dol-nlrb-are-creating-havoc-for-employers', '', '1'),
(48, '12', '42', 'Payroll Tax Changes for 2024 : Ringing in the New Year Taxwise', '<p>Ringing the new year for payroll professionals can be a hectic time. Finishing out the old year while ensuring the new year is off to a good start compliance-wise can be a delicate balancing act fraught with missteps if you don’t have all the information you need.&nbsp;In this webinar we will give the latest tax news for 2024 to help your payroll department transition from a tax year 2023 to tax year 2024. We will cover how all the latest tax news available including any new legislation affecting payroll in 2024.</p><p>Focusing first on the IRS, we will discuss the updates to inflation-based items such as the new pension plan limits and transportation fringe benefits. We will review the 2024 IRS forms including forms W-2, W-4 and 941.</p><p>Moving on to the states we will cover the updates to minimum wages, unemployment insurance wage bases and sick leave updates.</p><p>We will also cover any late-breaking legislation/regulation changes coming out of Washington.</p><h3><strong>What You will Learn:</strong></h3><ul><li>Latest changes to electronic filing thresholds for the&nbsp;<strong>Form W-2 for 2024!</strong></li><li><strong>New look and new copies for 2024 Form W-2?</strong></li><li>Update on tax year changes for social security wage base, fringe benefit limitations, federal per diem allowance, standard mileage rate, qualified transportation fringe benefits, and more.</li><li>Review of the Form 941 for 2024 and if it is finally over COVID</li><li>How to handle duplicate requests for Form W-2 including charging fees</li><li>Status review of Publication 1494 for 2024</li><li><strong>Changes to Form W-4 for 2024</strong></li><li>Best practices in the new year for gathering, calculating, taxing and reconciling W-2 data all year long as is now expected by the IRS</li><li>Taxation of fringe benefits for in the new year including awards and prizes, personal use of company cars and gift certificates</li><li>When to use the Form W-2c and when to correct the W-2 itself</li><li>State regulatory changes affecting payroll including SUI wage bases, minimum wage increases and more</li><li>Verifying employee names and SSN’s</li><li>Review of filing deadlines</li><li>Review of federal tax legislation</li></ul><h3><strong>Why You Should Attend:</strong></h3><p>This webinar concentrates on preparing the department for the new tax calendar year.&nbsp;Topics include IRS new limits on pension plans, updates to forms W-2, W-4 and 941, discussion of new or pending federal legislation and state updates including new rates for benefits, changes to minimum wage and SUI wage bases.</p><h3><strong>Who Should Attend:</strong></h3><ul><li>Payroll Executives/ Managers/ Administrators/ Professionals/ Practitioners/ Entry Level Personnel</li><li>Human Resources Executives/ Managers/Administrators</li><li>Accounting Personnel</li><li>Business Owners/ Executive Officers/ Operations and Departmental Managers</li><li>Lawmakers</li><li>Attorneys/ Legal Professionals</li><li>Any individual or entity that must deal with the complexities and requirements of Payroll compliance issues for Year End closing and preparing for the upcoming year.</li></ul><p><br></p>', '2024-02-26', '13:00', '90', '', 'ed4bafc9d8a0f3fc70fa_Payroll Tax Changes.jpg', '[{\"id\":31,\"category\":\"Live Options\",\"name\":\"1 Attendee\",\"price\":\"185\"},{\"id\":32,\"category\":\"Live Options\",\"name\":\"\\t2 Attendees (Save $45)\",\"price\":\"325\"},{\"id\":33,\"category\":\"Live Options\",\"name\":\"3 Attendees (Get 3 On Demands FREE)\",\"price\":\"455\"},{\"id\":34,\"category\":\"Live Options\",\"name\":\"4 Attendees (Get 4 On Demands FREE)\",\"price\":\"565\"},{\"id\":35,\"category\":\"Live Options\",\"name\":\"5 Attendees (Get 5 On Demands FREE)\",\"price\":\"685\"},{\"id\":36,\"category\":\"Super Saver Options\",\"name\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"price\":\"815\"},{\"id\":37,\"category\":\"Super Saver Options\",\"name\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"price\":\"935\"},{\"id\":38,\"category\":\"Super Saver Options\",\"name\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"price\":\"1025\"},{\"id\":39,\"category\":\"Super Saver Options\",\"name\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"price\":\"1105\"},{\"id\":40,\"category\":\"Super Saver Options\",\"name\":\"10 Attendees (10 ODs & 10 Transcripts FREE)\",\"price\":\"1195\"},{\"id\":41,\"category\":\"Recording & Combos\",\"name\":\"On Demand\",\"price\":\"185\"},{\"id\":42,\"category\":\"Recording & Combos\",\"name\":\"e-Transcript\",\"price\":\"200\"},{\"id\":43,\"category\":\"Recording & Combos\",\"name\":\"Live + On Demand\",\"price\":\"275\"},{\"id\":44,\"category\":\"Recording & Combos\",\"name\":\"Live + e-Transcript\",\"price\":\"285\"},{\"id\":45,\"category\":\"Recording & Combos\",\"name\":\"Live + OD + e-Transcript\",\"price\":\"375\"}]', 'payroll-tax-changes-for-2024-ringing-in-the-new-year-taxwise', '', '1'),
(49, '13', '40', 'Employee Retention in 2024: This is not your 2010s Workplace', '<p>In 2019, January 31st was the most popular day to quit your job. In 2022, it was January 21st.&nbsp;We don’t have the figures yet for 2023, but it’s most likely another day in January. But that doesn’t mean that once you make it to February, you’re good to go. You still need to focus on employee retention.</p><p>Remember, Gallup estimates that it costs anywhere from 50% to 200% of annual salary to replace people, making retention the most cost-effective way to handle your employees. So, it’s more efficient to retain a qualified employee than to recruit, train and orient a replacement employee of the same quality.&nbsp;Good retention starts at the time you hire an employee and continues throughout the employee life cycle.</p><p>This webinar will focus on why employees leave and what you can actually do to increase your employee retention. <strong>But caution: Retention takes actual work. This webinar will tell you what you need to do.</strong></p><h3><strong>What will You Learn:</strong></h3><ul><li>Major reasons why employees leave</li><li>Why is retention important?</li><li>Understand what your employees want &amp; Developing Retention Strategies</li><li class=\"ql-indent-1\">Employee surveys</li><li class=\"ql-indent-1\">Talking to employees</li><li class=\"ql-indent-1\">Stay interviews</li><li>Help employees set career goals</li><li class=\"ql-indent-1\">Find out career goals</li><li class=\"ql-indent-1\">Matching skills</li><li class=\"ql-indent-1\">Building a skills-based pipeline</li><li class=\"ql-indent-1\">Conducting gap analyses</li><li>Training managers</li><li>Facilitating Iternal movement</li><li class=\"ql-indent-1\">Remove barriers</li><li class=\"ql-indent-1\">Get manager buy-in</li><li class=\"ql-indent-1\">Focus on company success rather than departmental success</li><li>Money, money, money: why salaries really matter</li><li>Flexibility and Remote work</li><li>Putting it all together</li></ul><h3><strong>Why You should Attend:</strong></h3><p>Whenever an employee walks out the door, employees notice. Some will even start wondering if they should start looking for a new job, too. The impact of employee turnover goes beyond just dollars. That’s why employee retention and employee job satisfaction should be high on every organization’s list of priorities.</p><p>You need to retain your employees. Finding out the tips and tricks to retention can help decrease your turnover. This webinar will help you develop a path to retain your best employees.</p><h3><strong>Who should attend?</strong></h3><ul><li>Business Owners</li><li>Human Resources professionals</li><li>Managers &amp; Supervisors</li><li>Project Managers</li><li>Team Leaders</li><li>Compliance professionals</li><li>Operations professionals</li><li>Compensation Professionals</li><li>Recruiting Professionals</li></ul><p><br></p>', '2024-02-18', '16:20', '90', '', '036fa9d6c3710f2f8b35_EmployeeRetention.jpg', '[{\"id\":31,\"category\":\"Live Options\",\"name\":\"1 Attendee\",\"price\":\"185\"},{\"id\":32,\"category\":\"Live Options\",\"name\":\"\\t2 Attendees (Save $45)\",\"price\":\"325\"},{\"id\":33,\"category\":\"Live Options\",\"name\":\"3 Attendees (Get 3 On Demands FREE)\",\"price\":\"455\"},{\"id\":34,\"category\":\"Live Options\",\"name\":\"4 Attendees (Get 4 On Demands FREE)\",\"price\":\"565\"},{\"id\":35,\"category\":\"Live Options\",\"name\":\"5 Attendees (Get 5 On Demands FREE)\",\"price\":\"685\"},{\"id\":36,\"category\":\"Super Saver Options\",\"name\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"price\":\"815\"},{\"id\":37,\"category\":\"Super Saver Options\",\"name\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"price\":\"935\"},{\"id\":38,\"category\":\"Super Saver Options\",\"name\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"price\":\"1025\"},{\"id\":39,\"category\":\"Super Saver Options\",\"name\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"price\":\"1105\"},{\"id\":40,\"category\":\"Super Saver Options\",\"name\":\"10 Attendees (10 ODs & 10 Transcripts FREE)\",\"price\":\"1195\"},{\"id\":41,\"category\":\"Recording & Combos\",\"name\":\"On Demand\",\"price\":\"185\"},{\"id\":42,\"category\":\"Recording & Combos\",\"name\":\"e-Transcript\",\"price\":\"200\"},{\"id\":43,\"category\":\"Recording & Combos\",\"name\":\"Live + On Demand\",\"price\":\"275\"},{\"id\":44,\"category\":\"Recording & Combos\",\"name\":\"Live + e-Transcript\",\"price\":\"285\"},{\"id\":45,\"category\":\"Recording & Combos\",\"name\":\"Live + OD + e-Transcript\",\"price\":\"375\"}]', 'employee-retention-in-2024-this-is-not-your-2010s-workplace', '', '1'),
(50, '13', '40', 'Employee Handbook & NLB Audits - 2024 Updates: From the PUMP Act to Stericycle - What Employers need to know for 2024', '<p>By the time you hire your first employee, you really need a handbook. Handbooks cover the basic policies–dress codes, vacation policies, et cetera–and set the standard for how the company runs. The National Labor Relations Board (NLRB) is paying close attention, especially when it comes to union organizing. The Stericycle decision will affect you, even if you don’t think unions would ever come near your business.</p><p>Additionally, new laws such as the Pregnant Worker’s Fairness Act (PWFA) and the Providing Urgent Maternal Protections (PUMP) Act have changed how we approach maternity leaves and nursing mothers.</p><p>What about social media? And AI with things such as ChatGPT and Bard? Your handbook needs a good update and this will give you basic guidelines for getting your handbook up to date.</p><h3><strong>What will You Learn:</strong></h3><ul><li>What should be in a handbook; Company Policies</li><li class=\"ql-indent-1\">Impact of Stericycle Decision</li><li class=\"ql-indent-1\">Code of conduct</li><li class=\"ql-indent-1\">Standard hours</li><li class=\"ql-indent-1\">Attendance policy</li><li class=\"ql-indent-1\">Dress code</li><li class=\"ql-indent-1\">Breaks and meals</li><li class=\"ql-indent-1\">Technology policy (equipment)</li><li class=\"ql-indent-1\">Drug/Alcohol policy</li><li class=\"ql-indent-1\">Remote work policy</li><li>Legally required information</li><li class=\"ql-indent-1\">ADA (if 15 or more employees)</li><li class=\"ql-indent-1\">FMLA (if 50 or more employees)</li><li class=\"ql-indent-1\">PWFA/PUMP Act</li><li class=\"ql-indent-1\">Worker’s compensation</li><li class=\"ql-indent-1\">Non-discrimination policies (Title VII, ADEA)</li><li class=\"ql-indent-1\">At-will statement (non-contract)</li><li class=\"ql-indent-1\">The handbook is subject to change</li><li class=\"ql-indent-1\">Employee acknowledgment (signatures)</li><li>Things that might be new</li><li class=\"ql-indent-1\">Social media policy</li><li class=\"ql-indent-1\">Artificial Intelligence Policy</li><li class=\"ql-indent-1\">Multi-state policies</li><li>New Rules are retroactive – what does that mean</li><li>How the NLRB impacts Employee Handbooks and Why We Should care.</li><li>How the NLRA and the NLRB impact employee handbook policies and how the NLRB interprets the policies by Employers.</li></ul><h3><strong>Why you should attend:</strong></h3><p>Every company needs a handbook and every company needs to be up to date. Before you pay an attorney to rewrite your handbook, you need to figure out what you need and get things into place. Then have your attorney give it a review to ensure compliance in all laws. This webinar will help you save time and money by getting the basics in place. The new rule applies retroactively, so even those employee handbooks drafted and implemented before the Stericycle decision are subject to this heightened level of scrutiny.</p><h3><strong>Who should attend:</strong></h3><ul><li>Business Owners</li><li>Human Resources professionals</li><li>Managers &amp; Supervisors</li><li>Project Managers</li><li>Team Leaders</li><li>Compliance professionals</li><li>Operations professionals</li></ul><p><br></p>', '2024-02-15', '18:18', '90', '', 'e529e8ea8f857bfb109e_EmployeeHandbook&NLBAudits.jpg', '[{\"id\":31,\"category\":\"Live Options\",\"name\":\"1 Attendee\",\"price\":\"185\"},{\"id\":32,\"category\":\"Live Options\",\"name\":\"\\t2 Attendees (Save $45)\",\"price\":\"325\"},{\"id\":33,\"category\":\"Live Options\",\"name\":\"3 Attendees (Get 3 On Demands FREE)\",\"price\":\"455\"},{\"id\":34,\"category\":\"Live Options\",\"name\":\"4 Attendees (Get 4 On Demands FREE)\",\"price\":\"565\"},{\"id\":35,\"category\":\"Live Options\",\"name\":\"5 Attendees (Get 5 On Demands FREE)\",\"price\":\"685\"},{\"id\":36,\"category\":\"Super Saver Options\",\"name\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"price\":\"815\"},{\"id\":37,\"category\":\"Super Saver Options\",\"name\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"price\":\"935\"},{\"id\":38,\"category\":\"Super Saver Options\",\"name\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"price\":\"1025\"},{\"id\":39,\"category\":\"Super Saver Options\",\"name\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"price\":\"1105\"},{\"id\":40,\"category\":\"Super Saver Options\",\"name\":\"10 Attendees (10 ODs & 10 Transcripts FREE)\",\"price\":\"1195\"},{\"id\":41,\"category\":\"Recording & Combos\",\"name\":\"On Demand\",\"price\":\"185\"},{\"id\":42,\"category\":\"Recording & Combos\",\"name\":\"e-Transcript\",\"price\":\"200\"},{\"id\":43,\"category\":\"Recording & Combos\",\"name\":\"Live + On Demand\",\"price\":\"275\"},{\"id\":44,\"category\":\"Recording & Combos\",\"name\":\"Live + e-Transcript\",\"price\":\"285\"},{\"id\":45,\"category\":\"Recording & Combos\",\"name\":\"Live + OD + e-Transcript\",\"price\":\"375\"}]', 'employee-handbook-nlb-audits-2024-updates-from-the-pump-act-to-stericycle-what-employers-need-to-know-for-2024', '', '1');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `category_id`, `question`, `answer`, `status`) VALUES
(9, '254', 'how do you do', 'typing', '0'),
(10, '254', 'hellow there', 'hi', '1'),
(11, '255', 'hellow there', 'how are you', '0');

-- --------------------------------------------------------

--
-- Table structure for table `faq_category`
--

CREATE TABLE `faq_category` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq_category`
--

INSERT INTO `faq_category` (`id`, `category`, `status`) VALUES
(254, 'Primary', 1),
(255, 'General', 1);

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` int(11) NOT NULL,
  `industry_name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `industry`
--

INSERT INTO `industry` (`id`, `industry_name`, `image`, `status`) VALUES
(12, 'Payroll & Taxation', '01e59cabe591afa6b4b3_GST CAR 2908-20.jpg', 1),
(13, 'Human Resources', 'a58694f48aa6260f1089_9898504.jpg', 1),
(14, 'BFSI', '17fed042e0d1164a86d6_10840.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_course`
--

CREATE TABLE `order_course` (
  `Id` int(11) NOT NULL,
  `Order_id` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `Course_id` int(11) NOT NULL,
  `Selling_Option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Selling_Option`)),
  `Price` double(10,2) NOT NULL,
  `Course_name` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `hash_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_course`
--

INSERT INTO `order_course` (`Id`, `Order_id`, `qty`, `Course_id`, `Selling_Option`, `Price`, `Course_name`, `status`, `hash_id`) VALUES
(66, 68, 1, 47, '[{\"itemId\":34,\"itemName\":\"4 Attendees (Get 4 On Demands FREE)\",\"itemPrice\":\"565\"},{\"itemId\":35,\"itemName\":\"5 Attendees (Get 5 On Demands FREE)\",\"itemPrice\":\"685\"},{\"itemId\":33,\"itemName\":\"3 Attendees (Get 3 On Demands FREE)\",\"itemPrice\":\"455\"},{\"itemId\":37,\"itemName\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"itemPrice\":\"935\"},{\"itemId\":38,\"itemName\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"itemPrice\":\"1025\"},{\"itemId\":45,\"itemName\":\"Live + OD + e-Transcript\",\"itemPrice\":\"375\"}]', 4040.00, '2024 Independent Contract Rule by DOL - Deadline for March 11, 2024! Audits by DOL & NLRB are Creati', 'Paid', 'cs_test_b14cGQQH3OhXkEiMpPpcsTiy2oJzs88xP6SCQcQSPbx01V37qod9h0Ab44'),
(67, 68, 1, 49, '[{\"itemId\":37,\"itemName\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"itemPrice\":\"935\"},{\"itemId\":38,\"itemName\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"itemPrice\":\"1025\"},{\"itemId\":39,\"itemName\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"itemPrice\":\"1105\"}]', 3065.00, 'Employee Retention in 2024: This is not your 2010s Workplace', 'Paid', 'cs_test_b14cGQQH3OhXkEiMpPpcsTiy2oJzs88xP6SCQcQSPbx01V37qod9h0Ab44'),
(68, 69, 1, 50, '[{\"itemId\":35,\"itemName\":\"5 Attendees (Get 5 On Demands FREE)\",\"itemPrice\":\"685\"},{\"itemId\":34,\"itemName\":\"4 Attendees (Get 4 On Demands FREE)\",\"itemPrice\":\"565\"},{\"itemId\":33,\"itemName\":\"3 Attendees (Get 3 On Demands FREE)\",\"itemPrice\":\"455\"},{\"itemId\":32,\"itemName\":\"\\t2 Attendees (Save $45)\",\"itemPrice\":\"325\"},{\"itemId\":31,\"itemName\":\"1 Attendee\",\"itemPrice\":\"185\"},{\"itemId\":41,\"itemName\":\"On Demand\",\"itemPrice\":\"185\"},{\"itemId\":42,\"itemName\":\"e-Transcript\",\"itemPrice\":\"200\"}]', 2600.00, 'Employee Handbook & NLB Audits - 2024 Updates: From the PUMP Act to Stericycle - What Employers need', 'Paid', 'cs_test_a1hcUbG14wu4xwE0dRhUUnoAVqEMf8ok8Je9owkkXEGMRBED7Kjt4um5dr'),
(69, 70, 1, 50, '[{\"itemId\":31,\"itemName\":\"1 Attendee\",\"itemPrice\":\"185\"},{\"itemId\":32,\"itemName\":\"\\t2 Attendees (Save $45)\",\"itemPrice\":\"325\"},{\"itemId\":33,\"itemName\":\"3 Attendees (Get 3 On Demands FREE)\",\"itemPrice\":\"455\"},{\"itemId\":34,\"itemName\":\"4 Attendees (Get 4 On Demands FREE)\",\"itemPrice\":\"565\"},{\"itemId\":35,\"itemName\":\"5 Attendees (Get 5 On Demands FREE)\",\"itemPrice\":\"685\"},{\"itemId\":36,\"itemName\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"itemPrice\":\"815\"},{\"itemId\":37,\"itemName\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"itemPrice\":\"935\"}]', 3965.00, 'Employee Handbook & NLB Audits - 2024 Updates: From the PUMP Act to Stericycle - What Employers need', 'Paid', 'cs_test_a1aFAAVkgPRWlCuIu3aYzK1ZKuX53DdXC7HKOMleWGrnXvyItigDTkr3Ia');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `bank_ref_no` varchar(255) NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `status_message` varchar(255) NOT NULL,
  `trans_date` datetime NOT NULL DEFAULT current_timestamp(),
  `hash_id` text NOT NULL,
  `FName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `Company_Name` varchar(50) NOT NULL,
  `Job_Title` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `Street_Address` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `Zip` int(50) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `grand_total` int(50) NOT NULL,
  `subtotal` int(50) NOT NULL,
  `discount` int(50) NOT NULL,
  `coupon_code` varchar(50) NOT NULL,
  `course_quantity` int(50) NOT NULL,
  `card_detail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`card_detail`)),
  `email_sent` smallint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `user_id`, `order_id`, `bank_ref_no`, `order_status`, `status_message`, `trans_date`, `hash_id`, `FName`, `lName`, `Company_Name`, `Job_Title`, `Country`, `Street_Address`, `City`, `State`, `Zip`, `Phone`, `Email`, `grand_total`, `subtotal`, `discount`, `coupon_code`, `course_quantity`, `card_detail`, `email_sent`) VALUES
(68, '35', 'CGMFDPP', '', 'Paid', '', '2024-02-10 16:12:31', 'cs_test_b14cGQQH3OhXkEiMpPpcsTiy2oJzs88xP6SCQcQSPbx01V37qod9h0Ab44', 'Mahendra', 'singh', 'Dream tech', 'dre', 'India', 'Mokhampur', 'lower Nathapur', 'Uttarakhand', 248005, '+919528298243', 'mahendrasinghddnuk@yopmail.com', 7090, 7105, 15, 'NEW15', 2, '[{\"course_title\":\"2024 Independent Contract Rule by DOL - Deadline for March 11, 2024! Audits by DOL & NLRB are Creating Havoc for Employers!\",\"course_id\":47,\"qty\":1,\"totalPrice\":4040,\"courseItems\":[{\"itemId\":34,\"itemName\":\"4 Attendees (Get 4 On Demands FREE)\",\"itemPrice\":\"565\"},{\"itemId\":35,\"itemName\":\"5 Attendees (Get 5 On Demands FREE)\",\"itemPrice\":\"685\"},{\"itemId\":33,\"itemName\":\"3 Attendees (Get 3 On Demands FREE)\",\"itemPrice\":\"455\"},{\"itemId\":37,\"itemName\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"itemPrice\":\"935\"},{\"itemId\":38,\"itemName\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"itemPrice\":\"1025\"},{\"itemId\":45,\"itemName\":\"Live + OD + e-Transcript\",\"itemPrice\":\"375\"}]},{\"course_title\":\"Employee Retention in 2024: This is not your 2010s Workplace\",\"course_id\":49,\"qty\":1,\"totalPrice\":3065,\"courseItems\":[{\"itemId\":37,\"itemName\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"itemPrice\":\"935\"},{\"itemId\":38,\"itemName\":\"8 Attendees (8 ODs & 8 Transcripts FREE)\",\"itemPrice\":\"1025\"},{\"itemId\":39,\"itemName\":\"9 Attendees (9 ODs & 9 Transcripts FREE)\",\"itemPrice\":\"1105\"}]}]', 0),
(69, '36', '2OX8B4S', '', 'Paid', '', '2024-02-10 16:39:16', 'cs_test_a1hcUbG14wu4xwE0dRhUUnoAVqEMf8ok8Je9owkkXEGMRBED7Kjt4um5dr', 'Mahendra', 'singh', 'Dream tech', 'dre', 'India', 'Mokhampur', 'lower Nathapur', 'Uttarakhand', 248005, '+919528298243', 'singhpriya200223@yopmail.com', 2600, 2600, 0, '', 1, '[{\"course_title\":\"Employee Handbook & NLB Audits - 2024 Updates: From the PUMP Act to Stericycle - What Employers need to know for 2024\",\"course_id\":50,\"qty\":1,\"totalPrice\":2600,\"courseItems\":[{\"itemId\":35,\"itemName\":\"5 Attendees (Get 5 On Demands FREE)\",\"itemPrice\":\"685\"},{\"itemId\":34,\"itemName\":\"4 Attendees (Get 4 On Demands FREE)\",\"itemPrice\":\"565\"},{\"itemId\":33,\"itemName\":\"3 Attendees (Get 3 On Demands FREE)\",\"itemPrice\":\"455\"},{\"itemId\":32,\"itemName\":\"\\t2 Attendees (Save $45)\",\"itemPrice\":\"325\"},{\"itemId\":31,\"itemName\":\"1 Attendee\",\"itemPrice\":\"185\"},{\"itemId\":41,\"itemName\":\"On Demand\",\"itemPrice\":\"185\"},{\"itemId\":42,\"itemName\":\"e-Transcript\",\"itemPrice\":\"200\"}]}]', 0),
(70, '37', 'KVZ7FFQ', '', 'Paid', '', '2024-02-10 16:53:38', 'cs_test_a1aFAAVkgPRWlCuIu3aYzK1ZKuX53DdXC7HKOMleWGrnXvyItigDTkr3Ia', 'Mahendra', 'singh', 'Dream tech', 'dre', 'India', 'Mokhampur', 'lower Nathapur', 'Uttarakhand', 248005, '+919528298243', 'mahi@yopmail.com', 3965, 3965, 0, '', 1, '[{\"course_title\":\"Employee Handbook & NLB Audits - 2024 Updates: From the PUMP Act to Stericycle - What Employers need to know for 2024\",\"course_id\":50,\"qty\":1,\"totalPrice\":3965,\"courseItems\":[{\"itemId\":31,\"itemName\":\"1 Attendee\",\"itemPrice\":\"185\"},{\"itemId\":32,\"itemName\":\"\\t2 Attendees (Save $45)\",\"itemPrice\":\"325\"},{\"itemId\":33,\"itemName\":\"3 Attendees (Get 3 On Demands FREE)\",\"itemPrice\":\"455\"},{\"itemId\":34,\"itemName\":\"4 Attendees (Get 4 On Demands FREE)\",\"itemPrice\":\"565\"},{\"itemId\":35,\"itemName\":\"5 Attendees (Get 5 On Demands FREE)\",\"itemPrice\":\"685\"},{\"itemId\":36,\"itemName\":\"6 Attendees (6 ODs & 6 Transcripts FREE)\",\"itemPrice\":\"815\"},{\"itemId\":37,\"itemName\":\"7 Attendees (7 ODs & 7 Transcripts FREE)\",\"itemPrice\":\"935\"}]}]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `pincode` varchar(50) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `fname`, `lname`, `uname`, `email`, `phone`, `gender`, `pincode`, `address1`, `address2`, `country`, `state`, `city`, `password`, `image`) VALUES
(35, 'Priya', 'Singh', 'Priya', 'mahendrainghddnuk@yopmail.com', '07534063219', 'female', '248005', 'PARTIMINE CHOCK , Mokhampur , dehradun  248005', 'dehradun', 'nepal', 'UTTARAKHAND', 'DEHRADUN', 'priya', 'data:image/png;base64,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');
INSERT INTO `registration` (`id`, `fname`, `lname`, `uname`, `email`, `phone`, `gender`, `pincode`, `address1`, `address2`, `country`, `state`, `city`, `password`, `image`) VALUES
(36, 'Mahendra', 'singh', 'singhpriya200223@yopmail.com', 'singhpriya200223@yopmail.com', '+919528298243', NULL, '248005', 'Mokhampur', NULL, 'India', 'Uttarakhand', 'lower Nathapur', 'YVE6hOF', NULL),
(37, 'Mahendra', 'singh', 'mahi@yopmail.com', 'mahi@yopmail.com', '+919528298243', NULL, '248005', 'Mokhampur', NULL, 'India', 'Uttarakhand', 'lower Nathapur', 'gpZ1NOi', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sales_promotion_coupon`
--

CREATE TABLE `sales_promotion_coupon` (
  `id` int(11) NOT NULL,
  `coupon_code` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `expire_date` varchar(255) NOT NULL,
  `coupons_status` varchar(255) NOT NULL,
  `coupons_limit` varchar(255) NOT NULL,
  `hashid` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_promotion_coupon`
--

INSERT INTO `sales_promotion_coupon` (`id`, `coupon_code`, `discount`, `start_date`, `expire_date`, `coupons_status`, `coupons_limit`, `hashid`, `status`) VALUES
(18, '2ND20', '20', '0024-01-12', '0024-04-24', 'Active', '1', 0, '0'),
(19, 'COMBO30', '30', '2024-02-22', '2024-02-28', 'Active', '100', 0, '0'),
(20, 'NEW15', '15', '2024-02-23', '2024-02-22', 'Active', '1000', 0, '0');

-- --------------------------------------------------------

--
-- Table structure for table `selling_category`
--

CREATE TABLE `selling_category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` text NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `selling_options`
--

CREATE TABLE `selling_options` (
  `id` int(11) NOT NULL,
  `selling_category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `cid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `selling_options`
--

INSERT INTO `selling_options` (`id`, `selling_category`, `name`, `price`, `status`, `cid`) VALUES
(31, 'Live Options', '1 Attendee', '185', '1', 0),
(32, 'Live Options', '	2 Attendees (Save $45)', '325', '1', 0),
(33, 'Live Options', '3 Attendees (Get 3 On Demands FREE)', '455', '1', 0),
(34, 'Live Options', '4 Attendees (Get 4 On Demands FREE)', '565', '1', 0),
(35, 'Live Options', '5 Attendees (Get 5 On Demands FREE)', '685', '1', 0),
(36, 'Super Saver Options', '6 Attendees (6 ODs & 6 Transcripts FREE)', '815', '1', 0),
(37, 'Super Saver Options', '7 Attendees (7 ODs & 7 Transcripts FREE)', '935', '1', 0),
(38, 'Super Saver Options', '8 Attendees (8 ODs & 8 Transcripts FREE)', '1025', '1', 0),
(39, 'Super Saver Options', '9 Attendees (9 ODs & 9 Transcripts FREE)', '1105', '1', 0),
(40, 'Super Saver Options', '10 Attendees (10 ODs & 10 Transcripts FREE)', '1195', '1', 0),
(41, 'Recording & Combos', 'On Demand', '185', '1', 0),
(42, 'Recording & Combos', 'e-Transcript', '200', '1', 0),
(43, 'Recording & Combos', 'Live + On Demand', '275', '1', 0),
(44, 'Recording & Combos', 'Live + e-Transcript', '285', '1', 0),
(45, 'Recording & Combos', 'Live + OD + e-Transcript', '375', '1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `speaker_info`
--

CREATE TABLE `speaker_info` (
  `speaker_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `designation` varchar(255) NOT NULL,
  `experience` text NOT NULL,
  `images` text NOT NULL,
  `resume` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1> active, 2 => deactive, 3=> deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `speaker_info`
--

INSERT INTO `speaker_info` (`speaker_id`, `name`, `email`, `phone_no`, `bio`, `designation`, `experience`, `images`, `resume`, `status`) VALUES
(39, 'Mark Schwartz', 'mark@mspayroll1.com', ' 9163182415', '<p><span style=\"background-color: rgb(255, 255, 255);\">M. Swratz earned a Master’s Degree in Business Administration from Santa Clara University. He worked for 8 years as an internal auditor for private and public entities. He evaluated business operations for efficiency and effectiveness. This included regulatory compliance, financial reporting and divisions’ ability to meet and exceed goals and standards set by the organization. He evaluated CalPERS’ payroll and HR division, one of the largest such divisions in California State Government. M. Swratz has processed payrolls for approximately 1 dozen small to medium sized businesses in Sacramento. He was also a payroll tax auditor for the State of California. His most complex business included multiple shifts, overtime calculations, garnishments, wage differentials, FLSA compliance and other wage and labor issues. His payroll software is flexible to all needs of the small business community. M. Swratz has provided consultation services for 8 different national payroll webinar providers. He has a wide presence, speaking to audiences on 20 different payroll tax related topics. These include Multi-State Employment, Fringe Benefits, Audits, Root-Cause analysis, Payroll Related Fraud, and many others. This forces Philip to keep up on all the latest payroll laws and regulations in all 50 states. This ensures both accuracy in processing your payroll, but also the flexibility and knowledge to grow with your business.</span></p>', 'The Payroll Advisor', '9', '816e2800f2cb1cb26b45_Mark Schwartz.jpg', '', 0),
(40, 'Suzanne Lucas', 'suzannemlucas01@gmail.com', '1234657898', '<p>Suzanne Lucas spent 10 years in corporate HR where she hired, fired, managed the numbers, and double-checked with the lawyers. She left the corporate world to advise people and companies on how to have the best Human Resources departments possible. Suzanne integrates best practices with innovative ideas and humor, including using improv comedy as a tool for leadership development. Suzanne’s writings have been published at CBS News, Inc. Magazine, Reader’s Digest, and many other sites. She’s been named a top influencer in HR. You can read her archives at EvilHRLady.org or check out her Tedx Talk: Forget Talent and Get to Work.</p>', 'Evil HR Lady', '9', 'ddd3719c229667c6e01b_Suzanne Lucas.jpg', '', 1),
(41, 'Margie Faulk', '', '', '<p><strong>Margie Faulk</strong> is a senior level human resources professional with over 15 years of HR management and compliance experience. A current Compliance Advisor for HR Compliance Solutions, LLC, Margie, has worked as an HR Compliance advisor for major corporations and small businesses in the small, large, private, public, Non-profit sectors and International compliance. Margie has provided small to large businesses with risk management strategies that protect companies and reduces potential workplace fines and penalties from violation of employment regulations. Margie is bilingual (Spanish) fluent and Bi-cultural.</p><p>Margie’s area of expertise includes Criminal Background Screening Policies and auditing, I-9 document correction and storage compliance, Immigration compliance, employee handbook development, policy development, sexual harassment investigations/certified training, SOX regulations, OSHA compliance, payroll compliance, compliance consulting, monitoring US-based federal, state and local regulations, employee relations issues, internal investigations, HR management, compliance consulting, internal/external audits, and performance management.</p><p>Margie’s unique training philosophy includes providing free customized tools for all attendees. These tools are customized and have been proven to be part an effective risk management strategy. Some of the customized tools include the I-9 Self Audit. Correction and Storage program, Ban the Box Decision Matrix Policy that Employers can provide in a dispute for allegations, Family Medical Leave Act (FMLA) Compliance Guide, Drug-Free Workplace Volatile Termination E-Book and other compliance program tools when attendees register and attend Margie’s trainings. Margie holds professional human resources certification (PHR) from the HR Certification Institution (HRCI) and SHRM-CP certification from the Society for Human Resources Management. Margie is a member of the Society of Corporate Compliance &amp; Ethics (SCCE).</p>', 'HR Compliance Officer', '10', 'ae28f4c4cecda88bab4a_Margie Faulk.jpg', '', 0),
(42, 'Vicki M. Lambert', 'vicki@payrolladvisor.com', '985611', '<p><strong>Vicki M. Lambert, CPP</strong>, is President and Academic Director of The Payroll Advisor™, a firm specializing in payroll education and training. With nearly 40 years of hands-on experience in all facets of payroll functions as well as over three decades as a trainer and author.</p><p>Ms. Lambert has become the most sought-after and respected voice in the practice and management of payroll issues. She has conducted open market training seminars on payroll issues across the United States that have been attended by executives and professionals from some of the most prestigious firms in business today. A pioneer in electronic and online education, Ms. Lambert produces and presents payroll-related audio seminars, webinars, and webcasts for clients, APA chapters, and business groups throughout the country.</p><p>Ms. Lambert is an adjunct faculty member at Brandman University in Southern California and is the creator of and instructor for their Practical Payroll Online program, which is approved for recertification hours by the APA. She is also the instructor for the American Payroll Association’s “PayTrain” online program also offered by Brandman University.</p>', 'The Payroll Advisor', '12', '25d68b96246a44264444_Vicki M. Lambert.jpg', '', 1),
(43, 'Janette S Levey ', 'Janettte@GMAIL.COM', '789456123', '<p><strong style=\"background-color: rgb(255, 255, 255);\">Janette S Levey</strong><span style=\"background-color: rgb(255, 255, 255);\">&nbsp;“The Employer’s Lawyer” has over 20 years of legal experience, more than 10 of which she has spent in Employment Law. It was during her tenure as sole in-house counsel for a mid-size staffing company headquartered in Central New Jersey, with operations all over the continental US, that she truly developed her passion for Employment Law.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255);\">Janette works with employers on most employment law issues, to ensure that employers are in the best position possible to avoid litigation, audits, employee relations problems, and the attendant, often exorbitant costs. Janette has written articles on many different employment law issues for many publications, including EEO Insight, Staffing Industry Review, @Law, and Chief Legal Officer.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255);\">Janette has served on the Workplace Violence Prevention Institute, a multidisciplinary task force dedicated to providing proactive, holistic solutions to employers serious about promoting workplace safety and preventing workplace violence. Janette currently serves as an Advisory Board Member for Child and Family Resources of Morris County, New Jersey.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255);\">Janette has also spoken and trained on topics, such as Criminal Background Checks in the Hiring Process, Joint Employment, Severance Arrangements, Addressing and Preventing Employee Leave Abuse, Pre-Employment Screening among many, many others.</span></p>', 'The Employers Lawyer', '7', '483d000216a0c307cc53_Janette S. Levey.jpg', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subscribe`
--

CREATE TABLE `subscribe` (
  `id` int(24) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` int(22) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `datetime`, `image`, `name`, `designation`, `message`, `status`) VALUES
(0, '2023-12-11 15:36:03', 'img1.jpg', 'mahi', 'web developer', 'best for your grow up', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `pin_code` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `datetime` datetime NOT NULL,
  `hash_id` text NOT NULL,
  `address2` text NOT NULL,
  `job_profile` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `company_name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_message`
--

CREATE TABLE `user_message` (
  `Id` int(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Message` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `course_detail`
--
ALTER TABLE `course_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq_category`
--
ALTER TABLE `faq_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_course`
--
ALTER TABLE `order_course`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_promotion_coupon`
--
ALTER TABLE `sales_promotion_coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selling_category`
--
ALTER TABLE `selling_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selling_options`
--
ALTER TABLE `selling_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `speaker_info`
--
ALTER TABLE `speaker_info`
  ADD PRIMARY KEY (`speaker_id`);

--
-- Indexes for table `subscribe`
--
ALTER TABLE `subscribe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_message`
--
ALTER TABLE `user_message`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `course_detail`
--
ALTER TABLE `course_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `faq_category`
--
ALTER TABLE `faq_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `industry`
--
ALTER TABLE `industry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `order_course`
--
ALTER TABLE `order_course`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `sales_promotion_coupon`
--
ALTER TABLE `sales_promotion_coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `selling_category`
--
ALTER TABLE `selling_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `selling_options`
--
ALTER TABLE `selling_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `speaker_info`
--
ALTER TABLE `speaker_info`
  MODIFY `speaker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `subscribe`
--
ALTER TABLE `subscribe`
  MODIFY `id` int(24) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user_message`
--
ALTER TABLE `user_message`
  MODIFY `Id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
