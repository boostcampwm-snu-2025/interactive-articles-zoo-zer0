export function ToggleClean({
  summary,
  content,
}: {
  summary: string;
  content: React.ReactNode;
}) {
  return (
    <div>
      <style>{`
        details summary {
          cursor: pointer;
          font-weight: normal;
        }
        details[open] summary {
          font-weight: bold;
        }
        details{
          box-shadow: 0 0px 0px #3a3a3a73;
        }
        details[open]{
          box-shadow: 0 4px 8px #3a3a3a32;
        }
      `}</style>

      <details
        style={{
          textAlign: "left",
          width: "90%",
          maxWidth: "580px",
          margin: "auto",
          padding: "10px 15px",
          borderRadius: "10px",
          color: "rgba(84, 84, 84, 1)"
        }}
      >
        
        <summary style={{color:"rgba(43, 43, 43, 1)"}}>{summary}</summary>
        {content}
      </details>
    </div>
  );
}

export default function Top10Toggles(){
    return(
        <div style={{margin:"20px"}}>
            <ToggleClean summary={"1) Seller D | Quantity: 280 | Total: ₩198,279,000 | Matches: Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
⚾️구매 후 거래Q&A📣 확인 <br></br>
⚾️모든 문의는 거래Q&A💬로 문의 주세요(전화,문자❌)<br></br>
⚾️경기 관람을 위해 끝까지 도와드립니다🍿<br></br>
⚾️거래 파기 없는 판매자입니다🤓
                </div>
            }/>
            <ToggleClean summary={"2) Quantity: 276 | Total: ₩99,875,300 | Games: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
구매 후 스마트티켓을 받아보실 <br></br>
✔연락처를 <br></br>
판매자QnA를 통해 남겨주세요.<br></br>
<br></br>
📅 24시간 이내 스마트 티켓 발송<br></br>
빠른답변이 어렵습니다. QnA이용 바랍니다<br></br>
→ 스마트 티켓 등록 후 사용<br></br>
<br></br>
🚫 안전거래 안내<br></br>
입장전까지 출금 불가능한 안전거래 사이트이므로<br></br>
인증 및 좌석번호는 제공되지 않습니다.<br></br>
<br></br>
❗ 유의사항<br></br>
개인 변심으로 인한 환불은 불가합니다.<br></br>
구매 전에 경기일자와 구역을 정확히 확인해주세요.<br></br>
우천 및 미세먼지 등으로 인해 주최 측에서 취소 시 전액 환불됩니다.
                </div>
            }/>
            <ToggleClean summary={"3) Quantity: 128 | Total: ₩72,197,200 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
⚾️ 모바일 티켓 전달 예정<br></br>
⚾️ 구매 후 성함과 연락처 필히 기재<br></br>
⚾️ 확인 후 즉시 발송 예정                    
                </div>
            }/>
            <ToggleClean summary={"4) Quantity: 198 | Total: ₩71,918,000 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
***************필독*************<br></br>
<br></br>
Q&A에 성함 연락처 기재 바랍니다.<br></br>
성함 연락처 기재해주시면 경기 당일 Q&A로 티켓 전달 해드립니다.       
                </div>
            }/>
            <ToggleClean summary={"5) Quantity: 61 | Total: ₩32,414,000 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
경기 취소로 인한 환불 시(우천, KBO 취소 등) 전액 환불됩니다! 💸<br></br>
<br></br>
여러 번의 안전한 거래 경험이 있는 판매자로,<br></br>
지금까지 사고가 발생한 적은 단 한 번도 없어요.<br></br>
안심하고 거래하셔도 좋습니다! 👍<br></br>
<br></br>
티켓 수령 안내 🎫<br></br>
티켓은 스마트티켓을 통해 보내드립니다.<br></br>
구매 후, 티켓을 받으실 분의 전화번호와 성함을 Q&A 게시판에 남겨주세요!<br></br>
<br></br>
환불/취소 규정 🚫<br></br>
단순 변심으로 인한 구매 후 취소는 어렵습니다. 신중하게 구매해 주세요! 🤔<br></br>
<br></br>
궁금한 점이 있다면 언제든지 메시지 보내주세요! 💬
                </div>
            }/>
            <ToggleClean summary={"6) Quantity: 42 | Total: ₩22,149,000 | Matches: Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
■ 티켓 전달 : 티켓선물하기<br></br>
<br></br>
- 티켓 선물하기로 진행되며 경기시작 2시간전에 선물하기로 핀번호로 보내드리며 티켓비 포함금액입니다<br></br>
<br></br>
■ 거래 성공 경험이 많은 신뢰판매자의 글입니다. 안전한 거래방식으로 안심하고 구매하십시요.<br></br>
<br></br>
■ 구매 후, 거래 Q&A (Trading Q&A) 로 구매자님의 [성함 , 연락처]이렇게 2가지 항목을 반드시 전송 주세요.<br></br>
<br></br>
■ 공연 취소시 전액 환불됩니다.
                </div>
            }/>
            <ToggleClean summary={"7) Quantity: 58 | Total: ₩17,826,000 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
⭐️QnA에 성함과 전화번호 꼭 남겨주세요<br></br>
<br></br>
⭕️모바일 티켓으로 발송<br></br>
<br></br>
✅티켓 등록이 처음이라 어려우시거나 그 외 기타 궁금하신 사항도 거래Q&A창에 남겨주시면 모두 답변해드립니다!<br></br>
<br></br>
☔️우천시 100% 자동 환불 됩니다.<br></br>
❌티켓베이 정책상 취소안됩니다.<br></br>
❌문의는 Q&A로, 문자나 전화 답장 안합니다.<br></br>
<br></br>
❗️상세 정보 읽지 않고 문의 시 답변하지 않으니 읽고 문의 부탁 드립니다.                    
                </div>
            }/>
            <ToggleClean summary={"8) Quantity: 40 | Total: ₩14,435,000 | Matches: Wildcard Round, Semi-Playoffs, Playoffs"} content={
                <div>
====================================================== <br></br>
<br></br>
★ 삼성 vs NC 삼성라이온즈파크 10월 6일 월요일 2시 ★<br></br>
<br></br>
&lt;&lt;&lt; 1루테이블 1블럭 8열 통로석테이블 &gt;&gt;&gt; 1석!!<br></br>
3연석 테이블 중 1석입니다. 통로석입니다.<br></br>
<br></br>
======================================================<br></br>
<br></br>
모바일 선물하기로 수령정보 제공합니다!!<br></br>
<br></br>
=====================================================
                </div>
            }/>
            <ToggleClean summary={"9) Quantity: 38 | Total: ₩14,085,200 | Match: Playoffs, Korean Series"} content={
                <div>
▩ 경기일시 : 2025년 10월 30일(목요일) 18시30분<br></br>
▩ 경기팀 : 한화이글스 vs 엘지트윈스<br></br>
▩ 경기장소 : 대전 이글스 파크 야구장<br></br>
▩ 좌석위치 : 중앙지정석 포수 뒤 단독좌석 중앙구역 통로근처 넓은좌석 앞 !! 같은줄의 2/2 입니다. 4칸 떨어져있어요. 양해구해서 바꾸면 연석이 되겠으나 둘둘씩.. 우선은 각개로 등록합니다! 한국시리즈 최고의 경기 4차전을 잡아야 합니다! 승기를 가져올 수 있습니다!<br></br>
<br></br>
▩ 모바일티켓 (놀티켓 스마트티켓 즉시 전송) - 놀티켓 스마트 티켓입니다!<br></br>
<br></br>
☛☛☛☛☛☛ 참고사항<br></br>
➊ 해당 티켓은 모바일 예매되었습니다<br></br>
➋ 구입후 QNA에 성함과 연락처를 남겨주세요. 확인후에 답변 드립니다!<br></br>
자세한 설명과 함께 핀번호로 보내드립니다 처음등록하시는분들도 이해쉽게 설명해드립니다<br></br>
➌ 결제 이후에는 티켓베이 정책상 취소가 불가하오니 신중한 고민 이후 구매<br></br>
부탁드립니다.<br></br>
➍ 구매해주셔서 감사합니다.. 한화 엘지가 요즘 너무 잘합니다! 우승을 위해 계속이어가며, 연승 이어갑시다^^ 낭만야구...                    
                </div>
            }/>
            <ToggleClean summary={"10) Quantity: 42 Total: | ₩11,860,000 | Matches: Wildcard Round, Semi-Playoffs, Playoffs, Korean Series"} content={
                <div>
<br></br>포스트시즌 와일드카드
<br></br>
<br></br>삼성 라이온즈 vs NC 다이노스 티켓 양도합니다.
<br></br>
<br></br>========================================
<br></br>
<br></br>2025년 10월 6일 (월) 14:00 대구 삼성라이온즈파크
<br></br>
<br></br>원정응원석 1-5구역27열 *통로석
<br></br>
<br></br>========================================
<br></br>
<br></br>내야블럭으로 그라운드와 가까워 경기박진감과 응원 열기를 느낄수 있습니다.
<br></br>
<br></br>통로측 좌석은 따로 명기하였습니다.
<br></br>
<br></br>오랜 경기 시간동안 이동이나, 화장실 갈 경우 편리한 장점이 있습니다.
<br></br>
<br></br>장시간 앉을 경우 통로측 좌석의 메리트가 있습니다.
<br></br>
<br></br>모바일티켓으로 송부합니다.
<br></br>
<br></br>Q&A에 성함과 연락처 남겨주시면 됩니다.
<br></br>
<br></br>경기전날 18시이전 구매시 22시 일괄발송.
<br></br>경기당일 구매시 경기 2시간 전 발송.
<br></br>
<br></br>좌석위치는 아래 참고하시기 바랍니다.
                </div>
            }/>

        </div>
    )
}