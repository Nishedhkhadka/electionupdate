import { useState, useEffect } from "react";
import NepalMap from "../components/map/NepalMap.jsx";
import { MainLayout } from "../layouts/MainLayout";
import { toNepaliNumber } from "../utils";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";

export default function Home() {
	const idleTimerRef = useRef(null);

	const isMapHoveredRef = useRef(false);
	const isPopupHoveredRef = useRef(false);

	const [selectedProvince, setSelectedProvince] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedConstituency, setSelectedConstituency] = useState("");
	const [hoveredConstituency, setHoveredConstituency] = useState(null);
	const [constituenciesData, setConstituenciesData] = useState([]);
	const [candidatesData, setCandidatesData] = useState([]);

	// Load constituency data on mount
	useEffect(() => {
		fetch("/data/constituency.json")
			.then((res) => res.json())
			.then((data) => setConstituenciesData(data))
			.catch((err) => console.error("Error loading constituency data:", err));
	}, []);

	useEffect(() => {
		fetch("/data/candidates.json")
			.then((res) => res.json())
			.then((data) => setCandidatesData(data))
			.catch((err) => console.error("Error loading candidates data:", err));
	}, []);

	const provinces = [
		{ id: 1, name: "कोशी प्रदेश" },
		{ id: 2, name: "मधेस प्रदेश" },
		{ id: 3, name: "बागमती प्रदेश" },
		{ id: 4, name: "गण्डकी प्रदेश" },
		{ id: 5, name: "लुम्बिनी प्रदेश" },
		{ id: 6, name: "कर्णाली प्रदेश" },
		{ id: 7, name: "सुदूरपश्चिम प्रदेश" },
	];

	const parties = [
		{
			id: "rsp",
			name: "राष्ट्रिय स्वतन्त्र पार्टी",
			image: "/assets/images/rsp_AiC1qh2xlI.jpg",
			direct: 125,
			proportional: 57,
			total: 182,
			votes: "51,83,493",
			color: "#07a4f2",
		},
		{
			id: "congress",
			name: "नेपाली कांग्रेस",
			image: "/assets/images/congress-logo_zVeY3un3Hj.jpg",
			direct: 18,
			proportional: 20,
			total: 38,
			votes: "17,59,172",
			color: "#2e7a05",
		},
		{
			id: "uml",
			name: "नेकपा (एमाले)",
			image: "/assets/images/uml-1_zfT0bMAJFO.jpg",
			direct: 9,
			proportional: 16,
			total: 25,
			votes: "14,55,885",
			color: "#910808",
		},
		{
			id: "ncp",
			name: "नेपाली कम्युनिष्ट पार्टी",
			image: "/assets/images/nepali-communist_uVwmNizOSk.jpg",
			direct: 8,
			proportional: 9,
			total: 17,
			votes: "8,11,577",
			color: "#f50f0f",
		},
		{
			id: "shram",
			name: "श्रम संस्कृति पार्टी",
			image: "/assets/images/shram-sanskriti-party_jrxdNsjzjb.jpg",
			direct: 3,
			proportional: 4,
			total: 7,
			votes: "3,85,902",
			color: "#d54b10",
		},
		{
			id: "rpp",
			name: "राष्ट्रिय प्रजातन्त्र पार्टी",
			image: "/assets/images/raprapa_RPVSZDsBPg.jpg",
			direct: 1,
			proportional: 4,
			total: 5,
			votes: "3,30,684",
			color: "#f0d105",
		},
	];

	const handleConstituencyHover = (data) => {
		isMapHoveredRef.current = true;

		if (idleTimerRef.current) {
			clearTimeout(idleTimerRef.current);
			idleTimerRef.current = null;
		}

		setHoveredConstituency(data);
	};

	const handleConstituencyLeave = () => {
		isMapHoveredRef.current = false;

		startIdleCheck();
	};

	const handlePopupEnter = () => {
		isPopupHoveredRef.current = true;

		if (idleTimerRef.current) {
			clearTimeout(idleTimerRef.current);
		}
	};

	const handlePopupLeave = () => {
		isPopupHoveredRef.current = false;

		startIdleCheck();
	};

	const startIdleCheck = () => {
		// only hide if BOTH are inactive
		if (isMapHoveredRef.current || isPopupHoveredRef.current) {
			return;
		}

		if (idleTimerRef.current) {
			clearTimeout(idleTimerRef.current);
		}

		idleTimerRef.current = setTimeout(() => {
			// re-check before hiding (safety)
			if (!isMapHoveredRef.current && !isPopupHoveredRef.current) {
				setHoveredConstituency(null);
			}
		}, 4000); // ⬅️ adjust time (3–6 sec recommended)
	};

	const legendItems = parties.map((p) => ({
		name: p.name,
		color: p.color,
	}));

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Handle search submission
	};

	const candidateMap = new Map(
		candidatesData.map((candidate) => [candidate.slug, candidate]),
	);

	return (
		<div className="home-page">
			{/* Candidate Search Form */}
			<div
				className="candidate-search-form"
				data-search-url="search.json"
			>
				<div className="search-overlay"></div>
				<div className="flex">
					<div className="elc-container">
						<div className="form-label">
							उम्मेदवार, दल वा निर्वाचन क्षेत्र खोज्नुहोस्
							<button className="trigger-close">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="30"
									height="30"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-x-icon lucide-x"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						</div>
						<form className="input-wrap">
							<input
								type="search"
								name="query"
								autoComplete="off"
								placeholder="कम्तिमा ३ अक्षर टाइप गर्नुहोस्..."
							/>
							<div className="form-autocomplete">
								<span className="counter search-counter">
									कम्तिमा ३ अक्षर टाइप गर्नुहोस्...
								</span>
								<div className="search-result-list"></div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<MainLayout bare>
				{/* Smart Filter */}
				<div className="smart-filter">
					<div className="elc-container">
						<form
							onSubmit={handleSubmit}
							className="smart-filter-form"
							id="smart-filter-form"
						>
							<div className="select-box">
								<select
									id="smart_filter_province_id"
									name="province_id"
									className="form-control"
									value={selectedProvince}
									onChange={(e) => setSelectedProvince(e.target.value)}
								>
									<option value="">प्रदेश</option>
									{provinces.map((province) => (
										<option
											key={province.id}
											value={province.id}
										>
											{province.name}
										</option>
									))}
								</select>
							</div>

							<div className="select-box">
								<select
									id="smart_filter_district_id"
									name="district_id"
									className="form-control"
									disabled={!selectedProvince}
									value={selectedDistrict}
									onChange={(e) => setSelectedDistrict(e.target.value)}
								>
									<option value="">जिल्ला</option>
								</select>
							</div>

							<div className="select-box">
								<select
									id="smart_filter_constituency_id"
									name="constituency_id"
									className="form-control"
									disabled={!selectedDistrict}
									value={selectedConstituency}
									onChange={(e) => setSelectedConstituency(e.target.value)}
								>
									<option value="">निर्वाचन क्षेत्र छान्नुहोस्</option>
								</select>
							</div>

							<div className="select-box">
								<input
									className="btn-submit"
									type="submit"
									value="खोज्‍नुहोस्"
								/>
							</div>
						</form>
					</div>
				</div>

				{/* Main Content */}
				<div
					className="elec-content-wrap"
					data-district-url="api/address/district.json?province_id=PROVINCE_ID"
				>
					{/* Map Section */}
					<section className="section nepalmap">
						<div
							className="elc-container flex"
							style={{ position: "relative" }}
						>
							<div
								className="mapcontainer"
								id="constituency-map"
								style={{ flex: 1 }}
							>
								<div className="spinner-wrapper flex flex-middle flex-center">
									<NepalMap
										onConstituencyHover={handleConstituencyHover}
										onConstituencyLeave={handleConstituencyLeave}
										constituenciesData={constituenciesData}
									/>
									<div
										style={{
											position: "absolute",
											bottom: "20px",
											left: "20px",
											background: "rgba(255,255,255,0.95)",
											padding: "10px 14px",
											borderRadius: "8px",
											boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
											zIndex: 200,
											fontSize: "13px",
											maxWidth: "260px",
										}}
									>
										{legendItems.map((item, idx) => (
											<div
												key={idx}
												style={{
													display: "flex",
													alignItems: "center",
													gap: "8px",
													marginBottom: "6px",
												}}
											>
												<span
													style={{
														width: "12px",
														height: "12px",
														backgroundColor: item.color,
														borderRadius: "2px",
														display: "inline-block",
													}}
												/>
												<span>{item.name}</span>
											</div>
										))}
									</div>
								</div>
							</div>
							{/* Hovered Constituency Candidates Card */}
							{hoveredConstituency && (
								<div
									onMouseEnter={handlePopupEnter}
									onMouseLeave={handlePopupLeave}
									style={{
										position: "absolute",
										right: "50px",
										top: "250px",
										transform: "translateY(-50%)",
										width: "350px",
										height: "auto",
										background: "#fff",
										borderRadius: "6px",
										overflow: "hidden",
										boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
										zIndex: 100,
										fontFamily: "'Noto Sans Devanagari', sans-serif",
									}}
								>
									{/* Header */}
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											padding: "12px 16px",
											background: "#f5f5f5",
											borderBottom: "2px solid #d32f2f",
										}}
									>
										<div
											style={{
												color: "#d32f2f",
												fontWeight: 700,
												fontSize: "22px",
											}}
										>
											{hoveredConstituency.name}
										</div>

										<div
											style={{
												color: "#d32f2f",
												fontSize: "18px",
												fontWeight: 500,
											}}
										>
											{hoveredConstituency.province_name}
										</div>
									</div>

									{/* Candidates */}
									{hoveredConstituency.candidates
										?.map((candidate) => ({
											...candidate,
											...candidateMap.get(candidate.slug),
										}))
										.sort((a, b) => b.votes - a.votes)
										.slice(0, 3)
										.map((candidate, idx) => (
											<div
												key={idx}
												style={{
													display: "flex",
													alignItems: "center",
													padding: "10px 12px",
													borderBottom: "1px solid #ddd",
													background: idx === 0 ? "#eef6ee" : "#fff",
													borderLeft:
														idx === 0 ? "4px solid #43a047" : "4px solid transparent",
												}}
											>
												{/* Candidate Image */}
												<img
													src={candidate.image || "/placeholder-user.jpg"}
													alt={candidate.name}
													style={{
														width: "52px",
														height: "52px",
														borderRadius: "50%",
														objectFit: "cover",
														marginRight: "12px",
														border: "1px solid #ccc",
													}}
												/>

												{/* Candidate Details */}
												<div style={{ flex: 1 }}>
													<div
														style={{
															fontSize: "16px",
															fontWeight: 700,
															color: "#222",
															lineHeight: 1.2,
														}}
													>
														{candidate.name}
													</div>

													<div
														style={{
															fontSize: "14px",
															color: "#444",
															marginTop: "3px",
														}}
													>
														{candidate.party}
													</div>
												</div>

												{/* Votes */}
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														alignItems: "flex-end",
														textAlign: "right",
														minWidth: "90px",
													}}
												>
													<div
														style={{
															color: idx === 0 ? "#43a047" : "#222",
															fontWeight: 700,
															fontSize: "24px",
														}}
													>
														{toNepaliNumber(candidate.votes)}
													</div>

													{idx === 0 && (
														<div
															style={{
																color: "#43a047",
																fontSize: "14px",
																fontWeight: 700,
																paddingLeft: "4px",
															}}
														>
															<BadgeCheck />
														</div>
													)}
												</div>

												{/* Party Symbol */}
												<div
													style={{
														marginLeft: "10px",
														width: "34px",
														textAlign: "center",
														fontSize: "24px",
													}}
												>
													<img
														src={candidate.partyLogo}
														alt={candidate.party}
														style={{
															width: "30px",
															height: "30px",
															objectFit: "contain",
														}}
														onError={(e) => {
															e.target.style.display = "none";
														}}
													/>
												</div>
											</div>
										))}
								</div>
							)}
						</div>
					</section>

					{/* Party Results Section */}
					<section className="section section-lead-table">
						<div className="elc-container">
							<div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
								<h3 className="heading-title">प्रतिनिधिसभा परिणाम</h3>
								<a
									className="btn"
									href="/result"
								>
									विस्तृत
								</a>
							</div>
							<div className="dn-grid dn-grid-small">
								{parties.map((party) => (
									<div
										key={party.id}
										className="col2 parties-card is-border"
									>
										<a href={`/party/${party.id}`}>
											<img
												src={party.image}
												alt={party.name}
											/>
											<span className="title">{party.name}</span>
										</a>
										<table>
											<thead>
												<tr>
													<th>प्रत्यक्ष</th>
													<th>समानुपातिक सिट</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<a href={`/winners?party_id=${party.id}`}>{party.direct}</a>
													</td>
													<td>{party.proportional}</td>
												</tr>
											</tbody>
										</table>
										<span
											style={{ backgroundColor: party.color }}
											className="total-seat"
										>
											कुल सिट: <strong>{party.total}</strong>
										</span>
										<p>
											सामानुपातिक मत:
											<span className="vote-samanupatik">{party.votes}</span>
										</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Province Results Section */}
					<section className="section pradesh-result">
						<div className="elc-container">
							<div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
								<h3 className="heading-title">प्रदेशअनुसार परिणाम</h3>
							</div>
							<div className="candidate--lists dn-grid dn-grid-small">
								{provinces.map((province) => (
									<div
										key={province.id}
										className="election-card col3"
									>
										<div className="candidate-card-header">
											<h3>
												<a href={`/province/${province.id}`}>{province.name}</a>
											</h3>
										</div>
										<div className="mx-height">
											<a
												href={`/province/${province.id}`}
												className="candidate-row pradesh-row"
											>
												<div className="candidate-media">
													<img
														className="candidate-photo"
														src="/assets/images/rsp_AiC1qh2xlI.jpg"
														alt="राष्ट्रिय स्वतन्त्र पार्टी"
													/>
													<div>
														<h3 className="title">राष्ट्रिय स्वतन्त्र पार्टी</h3>
														<div className="progress-bar">
															<div
																style={{
																	background: "#07a4f2",
																	width: "45%",
																}}
																className="progress-fill"
															></div>
														</div>
													</div>
												</div>
												<div className="candidate-detail">
													<div className="votes">—</div>
												</div>
											</a>
										</div>
										<div className="load-more">
											<a
												className="more"
												href={`/province/${province.id}`}
											>
												विस्तृत विवरण
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</div>
			</MainLayout>
		</div>
	);
}
