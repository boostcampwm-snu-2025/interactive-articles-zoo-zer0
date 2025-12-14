import Narrative from "../../components/Narrative";
import "./Ticketbay.css"
import Header from "../../components/Header.jsx";
import InteractiveStadium from './sections/StadiumInteractive/InteractiveStadium.tsx';
import ScrollytellingStadium from './sections/StadiumInteractive/ScrollytellingStadium.tsx';
import TimeScrollytelling from './sections/TimeScrolly/TimeScrolly.tsx';
import SusScrolly from './sections/TimeSus/Sus.Scrolly.tsx';
import Footer from './sections/Footer.tsx';
import Toggle from './assets/Toggle.tsx';
import QuoteBox from './assets/QuoteBox.tsx';
import Hero from './sections/Hero.tsx';
import { ToggleClean } from './sections/Top10Toggles.tsx';
import Top10Toggles from './sections/Top10Toggles.tsx';
import Conclusion from './sections/Conclusion.tsx';
import { Ratio } from './sections/DataWrapperCharts.tsx';
import SellerTables from './sections/StadiumInteractive/SellerTables.tsx';

export default function Tickets(){
  

  return (
    <div>
    <Header />
      <Hero />
      <Narrative content={
        <>
<p>
      <span className="dropcap">O</span>n October 15, 2025, college student Jang set an alarm for 2 p.m.—the exact time ticket sales opened for the KBO postseason playoffs between the Hanwha Eagles and Samsung Lions.
</p>

<p>
As an avid Hanwha fan, she logged on to the official booking site, hoping to finally get that ticket. Yet once again, she lost the ticketing wars, watching her queue number climb past 113,000.
</p>

<p>
"Yours isn't even that bad," her friend messaged back. "I'm 156,896th."
</p>

<p>
Frustrated, Jang browsed through online secondary markets. To her surprise, within minutes, over a thousand resale tickets were already uploaded. Yet, many were listed at three or four times the original price: a price—to a college student—that was no longer affordable. For fans like her, what was once a casual pastime had turned into a race against bots and a game increasingly inaccessible due to inflated prices.
</p>

<p>
In 2025, the KBO League celebrated a record-breaking season, drawing over 12 million fans—the highest in its history. The Samsung Lions alone attracted more than 1.6 million spectators, setting a new single-team attendance record. Yet behind this surge in popularity, a parallel resale market has quietly reshaped the fandom, dominated by an influential minority with no desire to attend a game: scalpers.
</p>

        </>
      } />
      <QuoteBox source="Merriam-Webster Dictionary"
        quote={
          <p>
            <strong>Scalp: </strong>to buy and sell so as to make small quick profits <em>especially</em> to resell at greatly increased prices
          </p>
        }
      color="rgb(43, 63, 107)"/>
      <Narrative content={
        <>
<p>
Scalping is no longer a mere matter of person-to-person resells, but has evolved into a shadow industry, thriving in this new digital landscape. <em>Ticketbay</em>, one of Korea’s largest online resale platforms, takes a 10% commission from every sale—a system critics argue rewards scalpers more than fans.
</p>

<p>
At <em>Beautiful Forest</em>, we analyzed the tens of thousands of listings on <em>Ticketbay</em> to uncover how large-scale scalpers drive up prices, and glimpsed into the inner workings of this hidden economy. 
</p>


        </>
      } />
      <Toggle summary="Read More: How We Collected the Data"
        content={
          <div>
<p>
As of 2025, Ticketbay is the most frequently reported platform on the Ministry of Culture, Sports, and Tourism’s online bulletin for illegal ticket resales in professional sports. Of the total 28,149 reports submitted, 21,990 were related to Ticketbay (source: Office of Assemblyman Hyung-bae Min).
</p>
<p>
Data Collection & Analysis Procedure <br></br>
Between July 25 and October 31, 2025, we crawled and analyzed listings for professional baseball games and concerts posted on Ticketbay.
</p>
<p>
To maintain consistency in data collection, we set fixed collection intervals. For baseball games, data was collected between 11 p.m. and midnight, 30 minutes after pre-sale and general openings, and one hour before the game began. For concerts, data was collected one day before the event and one hour prior to the start time.
</p>

          </div>
        }
      />
      <Narrative content={
        <div>
          <br></br>
          <h1>The Current State of Baseball Scalpers: Looking at the Numbers</h1>
<p>
From July 25 to August 14, an average of <strong>2,234 listings</strong> for regular-season KBO tickets appeared on Ticketbay every three-game series. Resale prices were, on average, <strong>1.8 times</strong> higher than the original face value.
</p>

<p>
For postseason games, the average resale price surged to <strong>3.4 times</strong> the original—<strong>nearly double</strong> the price increase seen during the regular season. Postseason demand alone pushed prices to unprecedented highs.
</p>
<Ratio />
        </div>
      } />
      <br></br>
      <ScrollytellingStadium /> 
      <br></br>     
      <p>Click on a game to view the average resale prices. Click on a seat to view its price distribution.</p>
      <div style={{transform:"scale(1)",display: "flex", flexDirection: "column", alignItems: "center"}}><InteractiveStadium /></div>
      <Narrative content={
        <div>
          <br></br>
          <h2>Another Barrier Created by Scalpers</h2>
            <img src='/ticketbay/img/휠체어석.png' style={{width:"100%"}}></img>
            <p>
              Even wheelchair-accessible seats appeared on resale platforms. During the postseason, a total of <strong>27 wheelchair tickets</strong> were listed, selling at an average of <strong>1.9 times</strong> the original price. Most of these tickets were bundled with nearby regular seats, rather than sold individually.

            </p>
            <p>
              Due to the commercial motivation behind ticket resales, some fans are being denied their only opportunity to attend a game due to excessive ticket inflation.
            </p>


        </div>
      } />
      <Narrative content={
        <div>
          <br></br>
          <h1>Following the Trace of Scalpers</h1>
<p>
Tracking regular season sales data by member ID revealed that a small number of sellers repeatedly registered large quantities of tickets. Some accounts registered hundreds of tickets, effectively running a commercial-scale business.
</p>

<SellerTables />
<p>
Above are the top 5 sellers ranked by quantity and profits, all generating <strong>at least 9 million won in profit</strong> during the regular season alone. 
</p>
<p>
Noticeably, Seller A (ID: 588064) ranked highly in both quantity and profits. During our investigation, they sold tickets for, not only the Hanwha vs LG three-game series, but numerous other games. Seller A resold a total of 425 tickets, profiting a total of ₩50,846,800 during regular season. 
</p>
<p>
Seller B (ID: 2208431) and Seller C (ID: 2681179)—both ranked in the top 5 sellers during the regular season—also sold tickets in the postseason.
</p>

<p>
An analysis of Ticketbay listing details showed that many postseason listings contained identical phrases, emoticons, and posting formats repeatedly used by these sellers in the regular season. This suggests that they continued large-scale ticket reselling in the postseason.
</p>
<p>
  Open the toggle to view examples of their listings.
</p>

        </div>
      } />
<ToggleClean summary={"Seller B (ID: 2208431) | Quantity: 182 | Total: ₩71,671,800 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series "} content={
   <div>
    
    <p>⭕QnA에 성함과 전화번호 꼭 남겨주세요</p>
    
    <br></br>
    
    <p>⭕스마트티켓 전송
    <br></br>❌바코드</p>
    
    <br></br>
    
    <p>❎제가 일때문에 경기전날 자정전이나 경기당일 낮에 한꺼번에 표를 보내드립니다
    <br></br>❎바로 받고싶으신분들은 구매하지마세요
    <br></br>❎우천시 자동 환불됩니다
    <br></br>❎구매시 취소 안됩니다 재판매 하셔야합니다
    <br></br>❎예시)한명이 못가게됐는데 취소해주세요, 날짜를 잘못봤어요
    <br></br>❎정확한 좌석 못알려드립니다 다른분들도 다 마찬가지에요
    <br></br>❎전화X 문의는 문자로 [Q&A에 적은 성함적어주시면 빠른답변가능]</p>
    
    <p>* 정규시즌과 포스트시즌에서 동일 문구 사용</p>
    
    	</div>
    }/>
<ToggleClean summary={"Seller C (ID: 2681179) | Quantity: 69 | Total: ₩47,259,200 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series "} content={
   <div>
    
    <p>플레이오프 3차전<br></br>
    ▩ 경기팀 : 삼성라이온즈 vs 한화이글스<br></br>
    ▩ 경기장소 : 대구삼성라이온즈파크<br></br>
    ▩ 좌석위치 : 1루 스카이상단지정석 U9블럭 17열 통로 4연석</p>
    
    <p>☛☛☛☛☛☛ 참고사항<br></br>
    ➊ 해당 티켓은 모바일티켓으로 예매되었습니다<br></br>
    ➋ 구매하시면 모바일티켓 등록가능한 핀번호를 보내드립니다.<br></br>
    처음이신분도 쉽게 등록하실수있게 자세한 설명해드립니다<br></br>
    ➌ 결제 이후에는 티켓베이정책상 취소가 불가하오니 신중한 고민 이후 구매
    부탁드립니다.<br></br>
    우천취소는 없습니다 우천순연으로 다음날 경기 관람하시면됩니다<br></br>
    ➍ 구매해주셔서 감사합니다</p>
    
    ---
    
    <em>*정규시즌 멘트</em>
    
    <p>▩ 무인 발권기에서 지류 티켓 출력 가능한 바코드를 경기 시작 2시간전까지 pin번호함에 보내드립니다.
    (정확한 좌석정보는 안내드리지 못하니 참고바랍니다.)</p>
    
    <p>☛☛☛☛☛☛ 참고사항<br></br>
    ➊ 해당 티켓은 티켓링크 현장발권티켓 예매되었습니다<br></br>
    ➋ 구매하시면 티켓베이 핀번호함으로 발권정보 보내드립니다<br></br>
    ➌ 결제 이후에는 티켓베이정책상 취소가 불가하오니 신중한 고민 이후 구매부탁드립니다.<br></br>
    ➍ 우천취소시 티켓베이에서 자동환불됩니다<br></br>
    구매해주셔서 감사합니다.</p>   
  </div>
}/>
      <Narrative content={<div>
<p>
Seller B sold tickets for all postseason games, from the Wildcard Round to the Korean Series, uploading a total of 182 tickets and generating an estimated profit of ₩71,671,800. Seller C uploaded a total of 69 tickets, worth ₩47,259,200. 
</p>

<p>
In addition to baseball tickets, Seller C also resold idol concert tickets, generating an additional ₩4,087,000 in profit.
</p>

      </div>}/>
<ToggleClean summary={"Seller C (ID: 2681179) | Quantity: 3 | Total: ₩4,087,000 | Performances: Stray Kids, Ive, NCT WISH"} content={
   <div>
    
    <p>WISH 팬분들 반갑습니다~ 오랜만에 하는 NCT WISH~  완전체 :) 오늘 막콘도 호응이 너무 좋을것으로 기대합니다!<br></br>
    "예매수수료 + 제반수수료 비용 포함하여 원가양도합니다!!!"<br></br>
    
    ▩ 경기일시 : 2025년 11월 2일(일요일) 16시00분<br></br>
    ▩ 경기팀 : NCT WISH 콘서트 막공<br></br>
    ▩ 경기장소 : 인천 인스파이어<br></br>
    ▩ 좌석위치 : 1층 정면구역 시제석 아닌 일반석 GLOBAL OKAY<br></br>
    
    ▩ 지류티켓 (본인확인이 끝난 티켓으로, 지류만으로 입장가능합니다!)<br></br>
    "표의 위치는 인스파이어에서 전달할 수 있도록 노력하겠습니다!<br></br>
    
    ☛☛☛☛☛☛ 참고사항<br></br>
    ➊ 해당 티켓은 모바일 예매되었습니다<br></br>
    ➋ 구입후 QNA에 성함과 연락처를 남겨주세요. 확인후에 답변 드립니다!<br></br>
    자세한 설명과 함께 핀번호로 보내드립니다 처음등록하시는분들도 이해쉽게 설명해드립니다<br></br>
    ➌ 결제 이후에는 티켓베이 정책상 취소가 불가하오니 신중한 고민 이후 구매
    부탁드립니다.<br></br>
    ➍ 구매해주셔서 감사합니다..  NCT WISH 공연 잘 즐기고 오세요!!<br></br></p>
    
    ---
    
    <p>아이브 팬분들 반갑습니다~ 오랜만에 하는 아이브 완전체 :) GLOBAL OKAY<br></br>
    
    ▩ 공연일시 : 2025년 11월 1일(토요일) 18시30분<br></br>
    ▩ 공연팀 : IVE 아이브 월드투어 서울 중간콘서트 FINAL<br></br>
    ▩ 경기장소 : 올림픽공원 KSPO DOME<br></br>
    ▩ 좌석위치 : 돌출무대 정면시야 유일 연석 앞쪽 자리, 어머니와 따님, 아빠와 따님 등 함께 볼 수 있습니다!<br></br>
    
    ▩ 카드형 지류 티켓 (현장 전달!! , 카드를 태깅하고 입장합니다!)<br></br>
    
    ☛☛☛☛☛☛ 참고사항<br></br>
    ➊ 해당 티켓은 MELON 티켓 예매되었습니다<br></br>
    ➋ 구입후 QNA에 성함과 연락처를 남겨주세요. 확인후에 답변 드립니다!<br></br>
    자세한 설명과 함께 처음 구매하시는 분도 이해하실 수 있게 도움드립니다!<br></br>
    ➌ 결제 이후에는 티켓베이 정책상 취소가 불가하오니 신중한 고민 이후 구매
    부탁드립니다.<br></br>
    ➍ 구매해주셔서 감사합니다.. 아이브분들 함께 공연 즐겨요 :)<br></br>
    
    GLOBAL OKAY</p>
    
    ---
    
    <p>STAY 스트레이 키즈분들 반갑습니다~ 오랜만에 하는 SKZ STRAY KIDS 완전체 :) GLOBAL OKAY<br></br>
    
    ▩ 공연일시 : 2025년 10월 19일(일요일) 18시00분<br></br>
    ▩ 공연팀 : SKZ 스트레이키즈 완전체 콘서트 앵콜 막콘<br></br>
    ▩ 경기장소 : 인천 아시아드 주경기장<br></br>
    ▩ 좌석위치 : 돌출무대 정면시야 맨 앞쪽 자리(펠릭스, 현진 모공까지 보이는 존 눈웃음 존)<br></br>
    
    ▩ 카드형 지류 티켓 (재배송(한국주소)!! 또는 합의하에 서울 퀵 등 전달 안전입장 OK)<br></br>
    
    ☛☛☛☛☛☛ 참고사항<br></br>
    ➊ 해당 티켓은 예스24 티켓 예매되었습니다<br></br>
    ➋ 구입후 QNA에 성함과 연락처를 남겨주세요. 확인후에 답변 드립니다!<br></br>
    자세한 설명과 함께 처음 구매하시는 분도 이해하실 수 있게 도움드립니다!<br></br>
    ➌ 결제 이후에는 티켓베이 정책상 취소가 불가하오니 신중한 고민 이후 구매
    부탁드립니다.<br></br>
    ➍ 구매해주셔서 감사합니다.. STAY 스테이분들 함께 공연 즐겨요 :)<br></br>
    
    GLOBAL OKAY</p>
    </div>
    }/>
    <Narrative content={<div>
<p>
Alongside Seller B and C, many other listings during postseason repeated identical phrases and emojis, suggesting repeated behavior by the same resellers.
</p>

<p>
Below are listing details for ten sellers that individually profited more than ₩10,000,000 during the postseason. 
</p>

    </div>} />
    <Top10Toggles />
    <Narrative content={<div>
<p>
All of these resellers sold large amounts of tickets for various games. Among them, Seller D sold 280 tickets, profiting an estimated total of ₩198,279,000.
</p>

<p>
In addition to the listing details, we observed suspicious patterns in the timing of the ticket uploads.
</p>

</div>}/>


      <TimeScrollytelling />
      <SusScrolly />
      <Conclusion />
      <Footer />
    </div>
  );
}