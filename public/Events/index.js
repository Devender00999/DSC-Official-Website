const pastDiv = document.getElementById("past");
const upcomingDiv = document.getElementById("upcoming");

const api_url =
	"https://spreadsheets.google.com/feeds/list/1xT_aIrk3p-1D5H-guczpwBk1NuT-5zh9WM8AL6hOEIw/1/public/full?alt=json";

async function getEventsData(url) {
	const response = await fetch(url);
	const data = await response.json();
	var entries = data.feed.entry;
	

	console.log(entries);
	
	// console.log(entries[1].gsx$description.$t);
	for (index in entries) {
		// console.log(entries[index].gsx$description.$t);
		// console.log(entries[index].gsx$date.$t);
		// console.log(now);
		const now = new Date();
		now;
		const compareDate = new Date(entries[index].gsx$date.$t);

		const now_ms = now.getTime();
		const compareDate_ms = compareDate.getTime();

		// console.log(compareDate);
		// console.log(compareDate_ms);

		if (now_ms < compareDate_ms) {
			console.log("upcoming");
			upcomingDiv.innerHTML += `
			
			<div class='row events'> 
				<div class="col-md-12 cards event-card wow fadeInUp">
				<div class="featured-image">
				<img
					src="${event_img}"
					alt="Event one poster"
					class="card-img-top"
				/>
				</div>
				
				<div class="card-body">
				<h5 class="card-title">${entries[index].gsx$name.$t}</h5>
						
				<table>
				<tr>
					<td width="15%" class="text-blue">
						<i class="far fa-calendar-alt"></i>
					</td>
					<td>${entries[index].gsx$date.$t}</td>
				</tr>
				<tr>
					<td class="text-red">
						<i class="fas fa-map-marker-alt"></i>
					</td>
					<td>${entries[index].gsx$location.$t}</td>
				</tr>
				<tr>
					<td class="text-green"><i class="far fa-clock"></i></td>
					<td>${entries[index].gsx$time.$t}</td>
				</tr>
			</table>
			<a class="button float-right"
			href="${entries[index].gsx$eventlink.$t}"
			>Attend</a>	
						</div>
					</div>
		`;
		
		} else {
			console.log("past");
			pastDiv.innerHTML += `
		<section class="section-spacer>
			<div class="container">
				<div
					class="row my-4 flex-column-reverse flex-sm-row align-items-cengit ter"
				>

					<div class="col-sm-5 mr-auto wow fadeInUp">
					<div class="feature-list-wrapper">
						<div class="content-header">
							<h2 class="content-title">${entries[index].gsx$name.$t}</h2>
							<hr />
							<h6>DATE:${entries[index].gsx$date.$t}</h6>
							<h6>VENUE:${entries[index].gsx$location.$t}</h6>
							<p>${entries[index].gsx$description.$t}</p>
						</div>
						<a
						href="#"
						class="past-event"
						target="_blank"
						rel="noopener"
						>EVENT VIDEO&nbsp;&nbsp;<i class="fas fa-camera"></i
					></a>
					</div>
					</div>
					<div class="col-sm-7">
						<div class="feature-list-image">
						<img src="${entries[index].gsx$imageurl.$t}" alt="one event " width="350" height="350">
						</div>
					</div>
				</div>
			</div>
		</section>
		`;
		
		}
	}

	var imgUrl = new Url(entries[index].gsx$imageurl.$t);
				var event_img = document.createElement("img");
				event_img.classList.add("card-img-top");
				event_img.setAttribute(
					"src",
					extractor(imgUrl)
				);
				

function extractor(url_id) {
	console.log(url_id.search("google.com"));
	if (url_id.search("google.com") != -1) {
	  var id = url_id.split("=");
	  url_link = "https://drive.google.com/uc?export=view&id=";
	  var url = url_link.concat(id[1]);
	} else {
	  url = url_id;
	}
  
	console.log(url);
	return url;
  }
}

getEventsData(api_url);


  