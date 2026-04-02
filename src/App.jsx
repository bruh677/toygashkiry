/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Clock3,
  Heart,
  Volume2,
  VolumeX,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  const audioRef = useRef(null);
  const sectionsRef = useRef([]);
  const userHasScrolled = useRef(false);

  const musicUrl =
      "https://www.dropbox.com/scl/fi/f11vwl4tmelvxsfrz852k/Dombyra_-_Ku_bol_-SkySound.cc.mp3?rlkey=l3bm484d4cnvr0l6vyh17gv7u&st=00c58o7i&raw=1";

  const photoUrl =
      "https://www.dropbox.com/scl/fi/b9bc5f06memporydabs6u/6661c092-32a2-4c31-b0a0-dcc4228dda9d.jpg?rlkey=3i3m35ifn06wi69lati6dqkxb&st=2xduyrmh&raw=1";

  const mapPhotoUrl =
      "https://www.dropbox.com/scl/fi/wrb2lt6ks8ndtosvaqd8p/2026-04-02-00.01.54.png?rlkey=9yxx7dw3wns63b2inddlj2rox&st=q6d7dj0v&dl=0";
  const mapLink = "https://2gis.kz/karaganda/geo/70000001094204975";

  const googleFormAction =
      "https://docs.google.com/forms/d/e/1FAIpQLSczyM7RYkbi2kaDfVQ3iYBvQ56aemHq-r5Ma9FWHZvpllWTHA/formResponse";

  const googleNameEntry = "entry.395319518";
  const googleAttendanceEntry = "entry.448116797";

  const [isPlaying, setIsPlaying] = useState(false);
  const [, setCurrentSection] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sections = useMemo(
      () => ["hero", "invite", "calendar", "details", "poll", "location"],
      []
  );
  useEffect(() => {
    const handleScroll = () => {
      userHasScrolled.current = true; // 🔥 once user scrolls → stays true forever
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;
    audio.preload = "auto";
  }, []);

  useEffect(() => {
    const eventDate = new Date("2026-05-23T14:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSection((prev) => {

        if (userHasScrolled.current) return prev; // 🔥 STOP forever

        const next = (prev + 1) % sections.length;

        sectionsRef.current[next]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        return next;
      });
    }, 6500);

    return () => clearInterval(slideTimer);
  }, [sections.length]);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const scrollToNext = (index) => {
    const next = Math.min(index + 1, sections.length - 1);
    sectionsRef.current[next]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setCurrentSection(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guestName.trim() || !attendance) {
      return;
    }

    const formData = new FormData();
    formData.append(googleNameEntry, guestName);
    formData.append(googleAttendanceEntry, attendance);

    fetch(googleFormAction, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
        .then(() => {
          setSubmitted(true);
          setGuestName("");
          setAttendance("");
        })
        .catch((error) => {
          console.error("Form submit failed:", error);
        });
  };

  const mayCalendarDays = [
    ["", "", "", "", 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ];

  return (
      <div className="min-h-screen bg-[#f8f5ef] text-[#6e4b2f] selection:bg-yellow-200/60">
        <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #f8f5ef;
          font-family: "Caslon No 540 D", "Adobe Caslon Pro", "Big Caslon", Georgia, serif;
        }

        * {
          font-family: "Caslon No 540 D", "Adobe Caslon Pro", "Big Caslon", Georgia, serif;
          box-sizing: border-box;
        }

        .gold-text {
          background: linear-gradient(135deg, #8e5f13 0%, #d7b55b 26%, #fff1b8 42%, #c4942d 58%, #7f5310 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 10px rgba(212, 177, 89, 0.18));
        }

        .gold-border {
          position: relative;
          border: 2px solid rgba(184, 134, 11, 0.55);
          box-shadow: 0 0 0 5px rgba(214, 178, 82, 0.12), 0 18px 40px rgba(120, 83, 16, 0.08);
        }

        .ornament-corner::before,
        .ornament-corner::after {
          content: "";
          position: absolute;
          width: 58px;
          height: 58px;
          border-color: #be8e2f;
          opacity: 0.95;
          pointer-events: none;
        }

        .ornament-corner::before {
          left: 14px;
          top: 14px;
          border-left: 4px solid;
          border-top: 4px solid;
          border-top-left-radius: 22px;
        }

        .ornament-corner::after {
          right: 14px;
          top: 14px;
          border-right: 4px solid;
          border-top: 4px solid;
          border-top-right-radius: 22px;
        }

        .ornament-corner-bottom::before,
        .ornament-corner-bottom::after {
          content: "";
          position: absolute;
          width: 58px;
          height: 58px;
          border-color: #be8e2f;
          opacity: 0.95;
          pointer-events: none;
          bottom: 14px;
        }

        .ornament-corner-bottom::before {
          left: 14px;
          border-left: 4px solid;
          border-bottom: 4px solid;
          border-bottom-left-radius: 22px;
        }

        .ornament-corner-bottom::after {
          right: 14px;
          border-right: 4px solid;
          border-bottom: 4px solid;
          border-bottom-right-radius: 22px;
        }

        .ornament-ring {
          position: relative;
          border-radius: 9999px;
          background: linear-gradient(135deg, #7b5310, #d9b35a, #fff0bb, #b8831c, #7b5310);
          padding: 10px;
          box-shadow: 0 10px 30px rgba(166, 119, 24, 0.22);
        }

        .ornament-ring::before {
          content: "";
          position: absolute;
          inset: -18px;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 50% 0%, transparent 0 72%, rgba(190,142,47,0.95) 72% 74%, transparent 74%),
            radial-gradient(circle at 100% 50%, transparent 0 72%, rgba(190,142,47,0.95) 72% 74%, transparent 74%),
            radial-gradient(circle at 50% 100%, transparent 0 72%, rgba(190,142,47,0.95) 72% 74%, transparent 74%),
            radial-gradient(circle at 0% 50%, transparent 0 72%, rgba(190,142,47,0.95) 72% 74%, transparent 74%);
          mask: radial-gradient(circle, transparent 58%, black 59%);
          -webkit-mask: radial-gradient(circle, transparent 58%, black 59%);
          opacity: 0.9;
        }

        .soft-pattern {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(212, 177, 89, 0.08), transparent 32%),
            radial-gradient(circle at 80% 0%, rgba(212, 177, 89, 0.08), transparent 28%),
            radial-gradient(circle at 50% 100%, rgba(212, 177, 89, 0.08), transparent 26%);
        }

        .snap-section {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .luxury-card {
           overflow: visible;
        }

        .luxury-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,241,184,0.1) 35%, rgba(255,255,255,0.45) 50%, rgba(255,241,184,0.1) 65%, transparent 100%);
          transform: translateX(-130%);
          animation: shine 7s linear infinite;
          pointer-events: none;
        }
        .hero-photo {
          width: 240px;
          height: 240px;
          object-fit: cover;
          object-position: center; /* ensures face is centered */
          border-radius: 50%; /* optional, gives a circular shape */
          display: block;
          margin: 0 auto; /* centers horizontally */
        }


        .countdown-box {
          background: linear-gradient(180deg, #fffaf0 0%, #fff4df 100%);
          border: 1px solid rgba(196, 148, 45, 0.28);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 24px rgba(120, 83, 16, 0.08);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 8px;
        }

        .calendar-cell {
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          font-size: 0.95rem;
        }

        .calendar-active {
          background: linear-gradient(135deg, #8e5f13 0%, #d7b55b 50%, #8e5f13 100%);
          color: white;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(142, 95, 19, 0.28);
          border: 2px solid rgba(255, 239, 188, 0.9);
        }

        .form-input {
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(196, 148, 45, 0.35);
          background: #fffdf8;
          padding: 14px 16px;
          font-size: 1rem;
          color: #6f4d31;
          outline: none;
          transition: 0.2s ease;
        }

        .form-input:focus {
          border-color: #b4872f;
          box-shadow: 0 0 0 4px rgba(212, 177, 89, 0.15);
        }

        .radio-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          border-radius: 20px;
          border: 1px solid rgba(196, 148, 45, 0.28);
          background: #fffaf0;
          padding: 14px 16px;
          transition: 0.2s ease;
          cursor: pointer;
        }

        .radio-card.active {
          border-color: #b4872f;
          background: linear-gradient(180deg, #fff8ea 0%, #fff2d7 100%);
          box-shadow: 0 10px 22px rgba(180, 135, 47, 0.12);
        }

        .submit-button {
          display: inline-block;
          padding: 16px 40px;
          font-size: 18px;
          background: linear-gradient(to right, #8e5f13, #d7b55b, #8e5f13) !important;
        }

        .section-card {
          width: 100%;
          max-width: 560px;
          min-height: auto;
          border-radius: 2rem;
          background: #fcfaf6;
          padding: 28px 22px;
        }

        .map-image {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 1.5rem;
          display: block;
        }

        @keyframes shine {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(130%); }
        }

        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }

        @media (max-width: 640px) {
          .section-card {
            max-width: 100%;
            padding: 28px 18px 30px;
            border-radius: 1.75rem;
          }

          .hero-title {
            font-size: 2.05rem;
            line-height: 1.12;
            padding: 0 4px;
          }

          .large-section-title {
            font-size: 2rem;
            line-height: 1.15;
          }

          .detail-text,
          .main-text {
            font-size: 1.08rem;
            line-height: 1.9rem;
          }

          .countdown-text {
            font-size: 1.18rem;
            line-height: 2rem;
          }

          .calendar-cell {
            min-height: 38px;
            font-size: 0.9rem;
          }

          .map-image {
            height: 220px;
          }
        }
      `}</style>

        <audio ref={audioRef} src={musicUrl} />



        <section
            ref={(el) =>
                (sectionsRef.current[0] = el)}
            className="snap-section soft-pattern"
        >
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="ornament-corner ornament-corner-bottom gold-border luxury-card section-card relative text-center"
          >
            <div className="hero-photo-shell mx-auto mb-8 flex justify-center">
              <div className="ornament-ring relative rounded-[2.5rem] p-[6px]">
                <div className="hero-photo-frame">
                  <div className="hero-photo-box">
                    <img
                        src={photoUrl}
                        alt="Мерейтой иесі"
                        className="hero-photo"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p
                style={{ fontSize: "24px" }}
                className="hero-kicker mb-3 text-xl italic tracking-wide text-[#9b7745]"
            >
              Әкеміз
            </p>

            <h1 className="gold-text hero-title mb-6 text-center text-[2.3rem] font-semibold leading-[1.2] sm:text-5xl">
              <b>
                Сейдікәрімнің
                <br />
                80 жас мерейтойы
              </b>
            </h1>

            <p
                style={{ fontSize: "24px" }}
                className="hero-desc main-text mx-auto max-w-md text-lg leading-8 text-[#7b5b38]"
            >
              Қуанышымызға ортақ болып, ақ тілегіңізбен төрімізден орын алыңыз.
            </p>

            <button
                onClick={toggleSound}
                className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-[#c49a38] bg-white/90 px-4 py-2 text-sm shadow-lg backdrop-blur"
            >
              {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span>{isPlaying ? "Музыканы өшіру" : "Музыканы қосу"}</span>
            </button>
          </motion.div>
        </section>

        <section
            ref={(el) => (sectionsRef.current[1] = el)}
            className="snap-section soft-pattern"
        >
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="gold-border luxury-card section-card relative text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-[#b4872f]">
              <Heart size={18} fill="currentColor" />
              <Heart size={18} fill="currentColor" />
              <Heart size={18} fill="currentColor" />
            </div>

            <p
                style={{ fontSize: "24px" }}
                className="main-text text-lg leading-8 text-[#6f4d31]"
            >
              Құрметті ағайын-туыс, нағашы жиен, бөлелер, құда-жекжат, бауырлар,
              жора-жолдас, дос-жарандар, әріптестер, құрдастар мен жақындар!
            </p>

            <br />
            <br />

            <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a04b] to-transparent" />

            <p
                style={{ fontSize: "24px" }}
                className="main-text text-lg leading-8 text-[#6f4d31]"
            >
              Сіз(дер)ді Сейдікәрім атамыздың 80 жас мерейтойына арналған
              салтанатты дастарханымыздың қадірлі қонағы болуға шақырамыз!
            </p>

            <p
                style={{ fontSize: "24px" }}
                className="mt-8 text-xl font-semibold text-[#8b6435]"
            ><br />
              <b>
                <i>Той иелері: Ұл-қыздары</i>
              </b>
            </p>
          </motion.div>
        </section>


        <section
            ref={(el) => (sectionsRef.current[3] = el)}
            className="snap-section soft-pattern"
        >
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="gold-border luxury-card section-card relative"
          >
            <h2 style={{ fontSize: "32px" }} className="gold-text large-section-title mb-8 text-center text-3xl font-semibold">
              <b>Той салтанаты</b>
            </h2>

            <div className="space-y-5 text-[#6f4d31]">
              <div className="flex items-start gap-4 rounded-2xl bg-[#fffaf0] p-5 shadow-sm">
                <CalendarDays className="mt-1 text-[#b4872f]" size={33} />
                <div>
                  <p  style={{ fontSize: "24px" }} className="text-sm uppercase tracking-[0.18em] text-[#a47a2f]">
                    Күні
                  </p>
                  <p style={{ fontSize: "24px" }} className="mt-1 text-xl font-semibold"><b>23.05.2026</b></p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-[#fffaf0] p-5 shadow-sm">
                <Clock3 className="mt-1 text-[#b4872f]" size={33} />
                <div>
                  <p style={{ fontSize: "24px" }} className="text-sm uppercase tracking-[0.18em] text-[#a47a2f]">
                    Уақыты
                  </p>
                  <p style={{ fontSize: "24px" }} className="mt-1 text-xl font-semibold"><b>13:00</b></p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-[#fffaf0] p-5 shadow-sm">
                <MapPin className="mt-1 text-[#b4872f]" size={33} />
                <div>
                  <p style={{ fontSize: "24px" }} className="text-sm uppercase tracking-[0.18em] text-[#a47a2f]">
                    Мекен-жайымыз
                  </p>
                  <p style={{ fontSize: "24px" }} className="detail-text mt-1 text-lg leading-8 font-medium">
                    Теміртау қаласы, Абай көшесі, 27/a
                    <br />
                    «Золото» мейрамханасы
                  </p>
                </div>
              </div>
              <br /><br />

              <div className="countdown-box rounded-2xl p-5 text-center">
                <p style={{ fontSize: "24px" }} className="text-sm uppercase tracking-[0.18em] text-[#a47a2f]">
                  Той салтанатына дейін:
                </p>
                <p style={{ fontSize: "24px" }} className="countdown-text mt-3 text-2xl font-semibold leading-10 text-[#7b5b38]">
                  {countdown.days} күн {countdown.hours} сағат{" "}
                  {countdown.minutes} минут {countdown.seconds} секунд
                </p>
              </div>
            </div>
          </motion.div>
        </section>


        <section
            ref={(el) => (sectionsRef.current[2] = el)}
            className="snap-section soft-pattern"
        >
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="gold-border luxury-card section-card relative"
          >
            <h2 style={{ fontSize: "24px" }} className="gold-text large-section-title mb-6 text-center text-3xl font-semibold">
              <b>Күнтізбе</b>
            </h2>

            <div className="rounded-[1.75rem] bg-[#fffaf0] p-5 shadow-sm">
              <p
                  style={{ fontSize: "24px" }}
                  className="mb-4 text-center text-sm uppercase tracking-[0.22em] text-[#a47a2f]"
              >
                Мамыр 2026
              </p>

              <div className="calendar-grid mb-3 text-center text-xs uppercase tracking-[0.18em] text-[#a47a2f]">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="py-1">
                      {day}
                    </div>
                ))}
              </div>

              <div className="calendar-grid">
                {mayCalendarDays.flat().map((day, index) => (
                    <div
                        key={`${day}-${index}`}
                        className={`calendar-cell ${day === 23 ? "calendar-active" : ""}`}
                    >
                      {day}
                    </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section
            ref={(el) => (sectionsRef.current[5] = el)}
            className="snap-section soft-pattern"
        >
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="gold-border luxury-card section-card relative text-center"
          >
            <h2 style={{ fontSize: "24px" }} className="gold-text large-section-title mb-5 text-3xl font-semibold">
              <b>Карта</b>
            </h2>

            <p className="main-text mx-auto max-w-md text-lg leading-8 text-[#6f4d31]">
              Сіздерге ыңғайлы болу үшін төмендегі картаны қолданыңыз.
            </p>

            <a href={mapLink} target="_blank" rel="noreferrer" className="my-8 block">
              <img
                  src={mapPhotoUrl}
                  alt="Той өтетін жер картасы"
                  className="map-image shadow-sm"
              />
            </a>

            <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-gradient-to-r from-[#8e5f13] via-[#d7b55b] to-[#8e5f13] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              2GIS картасын ашу
            </a>
          </motion.div>
        </section>


        <section
            ref={(el) => (sectionsRef.current[4] = el)}
            className="snap-section soft-pattern"
        >
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="gold-border luxury-card section-card relative"
          >
            <h2 style={{ fontSize: "36px" }} className="gold-text large-section-title mb-4 text-center text-3xl font-semibold">
              <b>Қатысуыңызды растау</b>
            </h2>

            <p className="main-text mb-6 text-center text-lg leading-8 text-[#6f4d31]">
              Тойға келетініңізді растауыңызды сұраймыз
            </p>
            <br />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.18em] text-[#a47a2f]">
                </label>
                <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Аты-жөніңіз"
                    className="form-input"
                />
              </div>
              <br />
              <br />

              <label
                  className={`radio-card ${attendance === "Әрине, келемін" ? "active" : ""}`}
              >
                <input
                    type="radio"
                    name="attendance"
                    value="Әрине, келемін"
                    checked={attendance === "Әрине, келемін"}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="mt-1 h-4 w-4 accent-[#b4872f]"
                />
                <span className="detail-text text-base leading-7 text-[#6f4d31]">
                Әрине, келемін
              </span>
              </label>

              <label
                  className={`radio-card ${attendance === "Жұбайыммен келемін" ? "active" : ""}`}
              >
                <input
                    type="radio"
                    name="attendance"
                    value="Жұбайыммен келемін"
                    checked={attendance === "Жұбайыммен келемін"}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="mt-1 h-4 w-4 accent-[#b4872f]"
                />
                <span className="detail-text text-base leading-7 text-[#6f4d31]">
                Жұбайыммен келемін
              </span>
              </label>

              <label
                  className={`radio-card ${
                      attendance === "Өкінішке орай, келе алмаймын" ? "active" : ""
                  }`}
              >
                <input
                    type="radio"
                    name="attendance"
                    value="Өкінішке орай, келе алмаймын"
                    checked={attendance === "Өкінішке орай, келе алмаймын"}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="mt-2 h-5 w-5 accent-[#b4872f]"
                />
                <span className="detail-text text-base leading-7 text-[#6f4d31]">
                Өкінішке орай, келе алмаймын
              </span>
              </label>
              <br />

              <button
                  type="submit"
                  className="submit-button w-full max-w-lg mx-auto rounded-full px-10 py-5 text-xl font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                <b>Жіберу</b>
              </button>
            </form>

            {submitted && (
                <div className="mt-6 rounded-2xl bg-[#fff8e8] p-4 text-center shadow-sm">
                  <CheckCircle2 className="mx-auto mb-2 text-[#b4872f]" size={28} />
                  <p className="text-lg font-semibold text-[#7b5b38]">Рақмет!</p>
                  <p className="mt-2 text-base leading-7 text-[#6f4d31]">
                    Жауабыңыз Google Form-ға жіберілді.
                  </p>
                </div>
            )}

            <p className="mt-8 text-center text-lg font-medium text-[#8b6435]">
              <b>Қуанышымызға ортақ болыңыздар!</b>
            </p>
          </motion.div>
        </section>


      </div>
  );
}