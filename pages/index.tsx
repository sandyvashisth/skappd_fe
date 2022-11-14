/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import type { NextPage } from "next";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "../src/components/atoms/Link";
import Image from "next/image";
import EventIcon from "@mui/icons-material/Event";
import DirectionsIcon from "@mui/icons-material/Directions";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const iconMapper = {
  todo: EventIcon,
  path: DirectionsIcon,
  brifCase: BusinessCenterIcon,
};

const caregoryInfoCardsConfig = [
  {
    categoryId: "COOL_PLACES_TO_WORK",
    categoryName: "COOL PLACES TO WORK",
    items: [
      {
        imageSrc:
          "https://static2.shine.com/r/m/images/employerbranding/26c83ce6d9df4733a9bbc06d2e3b8f0e.png",
        link: "#",
        alt: "Infosys Limited",
      },
      {
        imageSrc:
          "https://static2.shine.com/r/m/images/employerbranding/d98a014b326648178fbb08eef46ac70e.png",
        link: "#",
        alt: "Teleperformance Global Services Pvt Ltd,",
      },
      {
        imageSrc:
          "https://static2.shine.com/r/m/images/employerbranding/d98a014b326648178fbb08eef46ac70e.png",
        link: "#",
        alt: "Teleperformance Global Services Pvt Ltd,",
      },
      {
        imageSrc:
          "https://static2.shine.com/r/m/images/employerbranding/d98a014b326648178fbb08eef46ac70e.png",
        link: "#",
        alt: "Teleperformance Global Services Pvt Ltd,",
      },
    ],
  },
  {
    categoryId: "TOP_COMPANIES_HIRING",
    categoryName: "TOP COMPANIES HIRING",
    items: [
      {
        imageSrc:
          "https://static2.shine.com/r/m/images/employerbranding/c250bee50f5b490aac4b63fe281ab79e.png",
        link: "#",
        alt: "Genpact India Pvt Ltd",
      },
    ],
  },
];
const earlyApplicantJobConfig = {
  jobCategory: "Remote Jobs",
  availableVacancies: [
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
  ],
};
const remoteApplicantJobConfig = {
  jobCategory: "Be An Early Applicant",
  availableVacancies: [
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
  ],
};
const walkinApplicantJobConfig = {
  jobCategory: "Walkin Jobs",
  availableVacancies: [
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
    {
      postDate: "3 days ago",
      jobTitle: "Technical Program Manager",
      companyName: "Adobe Systems",
      location: "Bangalore",
      experience: "5 to 10 Yrs",
    },
  ],
};
const iconWithLabel = (
  iconType: keyof typeof iconMapper,
  label: string,
  iconColor: string
) => {
  const Icon = iconMapper[iconType];
  return (
    <Box sx={{ textAlign: "center", padding: "1rem 3.5rem" }}>
      <Box
        sx={{
          backgroundColor: iconColor,
          height: "6rem",
          width: "6rem",
          position: "relative",
          borderRadius: "50%",
        }}
      >
        <Icon
          fontSize="large"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        />
      </Box>
      <Typography variant="h6" sx={{ fontSize: "16px", mt: "1rem" }}>
        {label}
      </Typography>
    </Box>
  );
};

type cardImage = {
  imageSrc: string;
  link: string;
  label?: string;
  alt: string;
};

type TInfoCard = {
  categoryId: string;
  categoryName?: string;
  items: Array<cardImage>;
};

type cards = Array<TInfoCard>;

const CaregoryInfoCards = ({ cards }: { cards: cards }) => {
  const [activeCategory, setActiveCategory] = useState(cards[0]?.categoryId);
  const [activeCards, setActiveCards] = useState(cards[0]?.items);

  const onCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    const activeItem =
      cards.find(({ categoryId: category }) => categoryId === category) ||
      cards[0];
    setActiveCards(activeItem?.items);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
          gap: "2.5rem",
        }}
      >
        {cards.map(({ categoryId, categoryName }) => (
          <Box key={categoryId}>
            <Box>
              <Button
                onClick={() => onCategoryChange(categoryId)}
                variant={
                  activeCategory === categoryId ? "contained" : "outlined"
                }
              >
                {categoryName}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
          gap: "4rem",
        }}
      >
        {activeCards.map(({ imageSrc, alt, link }: cardImage, index) => {
          return (
            <Link
              href={link}
              key={`${alt}-${index}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  minWidth: "260px",
                  boxShadow:
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                }}
              >
                <img alt={alt} width="100%" src={imageSrc} />
                <Typography
                  component="h1"
                  color="primary"
                  sx={{ padding: "1rem", fontWeight: "bold", textAlign: "center" }}
                >
                  SKAPPd - Boilerplate.
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

type TVacancy = {
  postDate?: string;
  jobTitle?: string;
  companyName?: string;
  location?: string;
  experience?: string;
};

type TJob = {
  jobCategory: string;
  availableVacancies: Array<TVacancy>;
};

const JobList = ({ job }: { job: TJob }) => {
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography
        sx={{
          fontSize: "40px",
          margin: "0 0 1.5rem",
          lineHeight: " 1.5",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {job.jobCategory}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        {job.availableVacancies.map(
          (
            { postDate, jobTitle, companyName, location, experience },
            index
          ) => {
            return (
              <Box
                key={`${index}`}
                sx={{
                  width: "380px",
                  padding: "1.5rem",
                  boxShadow:
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                }}
              >
                <Typography sx={{ fontSize: "12px", textAlign: "right" }}>
                  {postDate}
                </Typography>
                <Typography
                  sx={{
                    margin: "3px 0 0",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {jobTitle}
                </Typography>
                <Typography
                  sx={{
                    margin: "5px 0 0",
                    fontSize: "14px",
                  }}
                >
                  {companyName}
                </Typography>
                <Box sx={{ display: "flex", gap: "30px", marginLeft: "-5px" }}>
                  <Typography
                    sx={{
                      display: "inline-flex",
                      margin: "5px 0 0",
                      fontSize: "14px",
                      gap: "5px",
                    }}
                  >
                    <LocationOnIcon fontSize="small" />
                    {location}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline-flex",
                      margin: "5px 0 0",
                      fontSize: "14px",
                      gap: "5px",
                    }}
                  >
                    <BusinessCenterIcon />
                    {experience}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "30px", marginLeft: "5px" }}>
                  <Typography
                    sx={{
                      display: "list-item",
                      margin: "5px 0 0",
                      fontSize: "12px",
                      gap: "5px",
                    }}
                  >
                    Be an Early Applicant
                  </Typography>
                  <Typography
                    sx={{
                      display: "list-item",
                      margin: "5px 0 0",
                      fontSize: "12px",
                      gap: "5px",
                    }}
                  >
                    Regular
                  </Typography>
                </Box>
                <Link
                  href="#"
                  sx={{
                    marginTop: "10px",
                    textAlign: "right",
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Apply
                  </Typography>
                </Link>
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Link href="/login">
        <Box sx={{ width: "100%", height: "372px", position: "relative" }}>
          <Image
            alt="search job"
            src="/images/job-banner.webp"
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          padding: "3rem 0",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {iconWithLabel("todo", "Assessment", "#9cece0")}
        {iconWithLabel("path", "Career Path", "#ffced7")}
        {iconWithLabel("brifCase", "Dream Job", "#99e1ff")}
      </Box>
      <Box>
        <CaregoryInfoCards cards={caregoryInfoCardsConfig} />
      </Box>
      <Box>
        <JobList job={earlyApplicantJobConfig} />
      </Box>
      <Box>
        <JobList job={earlyApplicantJobConfig} />
      </Box>
      <Box>
        <JobList job={remoteApplicantJobConfig} />
      </Box>
      <Link href="/login">
        <Box sx={{ width: "100%", height: "372px", position: "relative", mt: "20px" }}>
          <Image
            alt="search job"
            src="/images/explore_banner.png"
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Link>
    </Box>
  );
};

export default Home;
