import Narrative from "../assets/Narrative";
import QuoteBox from "../assets/QuoteBox";
function BarChart(){
  return(<iframe title="Annual Count of Illegal Sports Ticket Resale Reports" aria-label="Column Chart" id="datawrapper-chart-x205W" src="https://datawrapper.dwcdn.net/x205W/1/" scrolling="no" style={{border:"none",backgroundColor:"white",padding:"10px",width:"402px", height:"450px"}} data-external="1"></iframe>)
}
function DonutChart(){
  return(<iframe title="Processing Status of Illegal Sports Ticket Resale Reports" aria-label="Donut Chart" id="datawrapper-chart-h03de" src="https://datawrapper.dwcdn.net/h03de/1/" scrolling="no" style={{border:"none",backgroundColor:"white",padding:"10px",width:"450px", height:"450px"}} data-external="1"></iframe>)
}
export default function Conclusion(){
    return(<div className="conclusion">
        <Narrative content={<div style={{marginTop:"10px"}}>
<p>
As online scalpers dominate the market, one may ask: can current laws hold them accountable? Under the existing Korean legal framework, it is complicated, as the law focuses on regulating the <em>act</em> of illegal ticket sales rather than clearly defining <em>scalped tickets</em> themselves.
</p>
<p>
The following are two relevant clauses:
</p>


        </div>} />


<QuoteBox quote={<div style={{color:"black"}}>
<p>
<strong>PUNISHMENT OF MINOR OFFENSES ACT Chapter II Article 3 (Categories of Minor Offenses) Paragraph 4</strong>
<br></br>
(Ticket-Scalping) Any person who resells admission tickets, passenger tickets, or boarding tickets at a <strong>premium at any entertainment place, stadium, station, ferry, stop, or other places</strong> where persons are charged for a fixed fare for admission or boarding.
</p>
</div>} source={<small style={{color:"gray"}}>Any of the following persons shall be punished by a fine not exceeding two hundred thousand won, by misdemeanor imprisonment, or by a minor fine.</small>} color={"rgba(149, 137, 113, 1)"}/>
<Narrative content={<p>→ This clause only regulates <strong>in-person</strong> deals sold at a premium, failing to address the pervasive online market.</p>} />
<br></br>
<QuoteBox quote={<p style={{color:"black"}}>
<strong>PUBLIC PERFORMANCE ACT Article 4-2 (Prohibition of illegal sale of tickets)</strong>
<br></br>(1) The Minister of Culture, Sports and Tourism shall endeavor to prevent the illegal sale (referring to an act of selling, or arranging the sale of, tickets, etc. to other persons at a higher price than the purchase price, without obtaining consent from the person selling, or entrusted with selling, the tickets, etc. <strong>habitually or for business</strong>; hereinafter the same shall apply) of entry tickets, admission tickets, discount coupons, exchange tickets, etc. for public performance (hereinafter referred to as "tickets, etc."). 
<br></br>(2) No one shall illegally sell tickets, etc. by using <strong>a program that automatically and repeatedly inputs a specified command in an information and communications network</strong> defined in Article 2 (1) 1 of the Act on Promotion of Information and Communications Network Utilization and Information Protection.
</p>} source={<small style={{color:"gray"}}>Any of the following persons shall be punished by imprisonment with labor for up to one year, or a fine not exceeding 10 million won (Article 41).</small>} color={"rgba(149, 137, 113, 1)"}/>

<Narrative content={<div>
<p>→ This clause uses the term “illegal sale” instead of “scalped tickets,” providing punishment in cases involving habitual sales, commercial intent, or the use of automated ticketing software. </p>

<br></br>

<p>
As both clauses define only the <em>act of</em> ticket-scalping, the definition of <em>scalped tickets</em> remains open to legal interpretation, limiting the effectiveness of these regulations.
</p>

<p>
Under current regulations, scalpers can only be punished for in-person deals, habitual or commercial purposes, or use of automated software. However, even these narrow criteria are challenging to enforce. In particular, infrastructure for detecting the use of automated software is lacking. Not only are there little to no guidelines, but there are also no monitoring standards nor follow-up measures for personnel.
</p>

<p>
In this vacuum of institutional and punitive measures, ticket scalping has become increasingly prevalent. Scalped tickets are not only sold on <em>Ticketbay</em>, but also on online platforms like X, <em>Bungaejangter</em>, <em>Danggeun Market</em>, etc. Yet, there are no effective sanctions in place
</p>

<p>
Following the government audit, <em>Ticketbay</em> announced preventative measures, including strengthened monitoring of suspicious automated software transactions, limiting sales to prevent mass ticket resales, and prohibiting the sale of complimentary tickets (i.e., tickets that were originally free). However, these policies are planned to take effect on December 1st, after large-scale ticket scalping had already occurred, leaving affected consumers without immediate recourse. Furthermore, while enhanced software detection measures are promised, the lack of specific detection criteria and established procedure raises questions about their real-world effectiveness.
</p>
<p>
The government’s reporting system is also failing. The Ministry of Culture, Sports, and Tourism operates an illegal ticket sales report board, yet follow-up measures are extremely rare.
</p>

</div>} />
              <div style={{width: "90%",
                    maxWidth: "1000px",display:"flex", margin: "auto", justifyContent:"space-evenly"}}>
                <div><BarChart/></div>
                <DonutChart/>
              </div>
<Narrative content={<div>
<p>
According to data provided by the office of Democratic Party lawmaker Hyung-bae Min, reports on ticket-scalping surged from 1,607 in 2020 to 28,149 in 2025, accumulating a total of 75,178 reports over six years. Alarmingly, of the tickets reported from January 2023 to July 2025, 64,319 had verified seating information, yet despite this clear evidence only 3,501 cases resulted in actual enforcement action: a mere 5.44%.
</p>

<br></br>


<h2>The Challenges left by Ticket Scalpers</h2>
<p>
The price inflation caused by scalping is not simply a financial loss; it escalates into a social issue that undermines cultural access. Sports, for instance, are more than mere leisure, but a public cultural domain meant to be enjoyed by the public. However, scalping is narrowing the scope of that opportunity. 
</p>

<p>
Experts point out that the proliferation of scalping is not a simple ticketing problem: it fundamentally shakes the integrity of consumer fairness.
</p>

<p>
Professor Hong-Joo Lee of Sookmyung Women’s University’s Department of Consumer Economics explains that when scalping becomes normalized, tickets end up in the hands of middlemen who possess capital and technology, instead of enthusiastic fans. This process fosters the problematic perception that “consumers who follow the rules lose out,” thereby eroding overall market trust. He added that when prices become disconnected from the true value of performance, consumers develop a sentiment of distrust, feeling they are being “ripped off.”
</p>

<p>
Professor Lee further argued that the resale premium places a greater burden on groups disadvantaged by income and information access, ultimately leading to an issue of equity concerning who gets the opportunity to enjoy culture. He thus points out that the right to cultural access is also being infringed upon.
</p>

<p>
Instead of aiming to eradicate scalping completely, Professor Lee suggests measures to reduce the risk premium while enhancing fairness and transparency. He emphasizes the necessity of a multi-layered system incorporating devices such as the introduction of official resale markets, repeated enforcement, lottery or weighted distribution, and price guardrails.
</p>

</div>} />

<QuoteBox quote={<p style={{color:"black"}}>
    <strong>FRAMEWORK ACT ON CULTURE Article 4 (Rights of citizens)</strong><br></br>
Every citizen shall have rights to freely create culture, participate in cultural activities, and enjoy culture (hereinafter referred to as "cultural rights") without being discriminated against in cultural expressions and activities, regardless of gender, religion, ethics, generation, region, political opinion, social status, economic position, physical condition, etc. 
</p>} source={<small style={{color:"gray"}}>Law No. 16593</small>} color={"rgba(140, 156, 189, 1)"}/>
<br></br>

<Narrative content={<div>
<p>
The widespread proliferation of scalped tickets transcends mere unfair consumption; it is a violation  of “cultural rights” guaranteed by law. The Framework Act on Culture stipulates that inequalities in cultural participation must not arise from disparities in capital or technological access. However, the current prevalence of ticket scalping only widens that gap.
</p>

<p>
Ticket scalpers are employing increasingly sophisticated methods, aided by rapid advancement of automated software technologies. However, regulatory frameworks and online platforms remain outpaced by this change. The repercussions of this regulatory vacuum ultimately affect the public, as participating in cultural activities, driven by pure passion, is increasingly gatekept by high premiums and competitive races against bots. 
</p>

<p>
While the complete eradication of ticket scalping is an overly ambitious goal, establishing fair and transparent systems will reduce harm and gradually restore market trust—returning tickets to the hands of those who truly want to attend. 
</p>
</div>} />


    </div>)
}