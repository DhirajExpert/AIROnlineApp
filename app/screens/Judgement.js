import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { getjudgement } from "../api/api";
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import BackButton from "../components/BackButton";
// import { WebView } from 'react-native-webview';
import globalstyle from '../core/Style'
import { Button, Text } from "react-native-paper";
import Modal from "react-native-modal";
import { theme } from "../core/theme";
import { Dimensions } from "react-native";
import { FAB } from 'react-native-paper';

export default function Judgement({ route }) {
    // const { width } = Dimensions.get('window');
    const scrollViewRef = useRef(null);
    const paragraphRef = useRef(null);
    const [judgement, setJudgement] = useState("");
    const { citationID, citationName } = route.params;
    const { width } = useWindowDimensions();

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [equalCitation, setEqualCitation] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    // const citationName = 'AIROnline 2019 JHA 177';


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const staticResponse = "<div class='centerContainer'><div class='citation'>2024 Cri LJ (NOC) 85 (AP):: AIROnline 2023 AP 501</div><div class='court'>Andhra Pradesh High Court</div><div class='judgesName'><strong>HON'BLE JUDGE(S): </strong>Duppala Venkata RamanaJ.</div><div class=dod>Criminal Petition - 4310 of 2015 D/-2023-06-14 </div><div class='partyName'>Kamireddy Chandrasekhar Reddy Vs. State of A.P.</div></div><div class='headNote'><br><strong>(A) <a href=\"#act-Criminal P.C. (2 of 1974)\">Criminal P.C. (2 of 1974)</a>, <a href=\"#section-S.482\">S.482</a>, <a href=\"#section-S.156(3)\">S.156(3)</a> - <a href=\"#act-Penal Code (45 of 1860)\">Penal Code (45 of 1860)</a>, <a href=\"#section-S.420\">S.420</a> - Quashing of proceedings - Allegations of cheating - Case of complainant that accused despite making sale agreement of suit property with him, had sold away the property to third parties for excess consideration - No notice was issued by complainant to accused expressing his readiness and willingness to perform his part of contract or even otherwise deposited the balance amount in Court by filing a suit - No cheating or dishonest intention of accused - Matter appears to be civil in nature which was given colour of a criminal offence to wreak vengeance against accused - Moreover, since complainant did not file his sworn affidavit in support of complaint allegations, Magistrate ought not to have forwarded the complaint to Police - Continuation of proceedings against accused would be an abuse of process of law - Proceedings, quashed. <div style=\"text-align: right;\">(Para No.(s)  <a href=\"#jpara-8\">8</a>, <a href=\"#jpara-10\">10</a>, <a href=\"#jpara-14\">14</a>, <a href=\"#jpara-15\">15</a>)</div></strong><br><br></div><div class='ref_heading'><h5>Cases Referred</h5><h5 class ='ChronologicalParas'>Chronological Paras</h5></div><div class='refferedCase'><br><div class='refferdCit'><a href=\"citation\"AIR 2021 SC 5298 \">AIR 2021 SC 5298 </a>: AIROnline 2021 SC 936 (Followed)</div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-12\">12</a>)</div></div><div class='refferedCase'><br><div class='refferdCit'><a href=\"citation\"AIR 2015 SC (Supp) 1085 \">AIR 2015 SC (Supp) 1085 </a>: <a href=\"citation\"2015 AIR SCW 2245 (Followed)\">2015 AIR SCW 2245 (Followed)</a></div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-16\">16</a>)</div></div><div class='refferedCase'><br><div class='refferdCit'>AIROnline 2015 SC 595 ( Followed)</div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-5\">5</a>, <a href=\"#jpara-15\">15</a>)</div></div><div class='refferedCase'><br><div class='refferdCit'>AIROnline 2012 SC 724 (Followed )</div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-13\">13</a>)</div></div><div class='refferedCase'><br><div class='refferdCit'><a href=\"citation\"AIR 2010 SC (Supp) 347 \">AIR 2010 SC (Supp) 347 </a>: <a href=\"citation\"2010 AIR SCW 405\">2010 AIR SCW 405</a></div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-11\">11</a>)</div></div><div class='refferedCase'><br><div class='refferdCit'><a href=\"citation\"AIR 2006 SC 2780 \">AIR 2006 SC 2780 </a>: <a href=\"citation\"2006 AIR SCW 3830\">2006 AIR SCW 3830</a></div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-12\">12</a>)</div></div><div class='refferedCase'><br><div class='refferdCit'><a href=\"citation\"AIR 1992 SC 604 (Followed )\">AIR 1992 SC 604 (Followed )</a></div> <div class='paraLink'> Para No.(s) (<a href=\"#jpara-9\">9</a>, <a href=\"#jpara-17\">17</a>)</div></div><span class = 'adv_name'><span>Name of Advocates</span></span><hr style='height:2px;background-color:gray'><div class=advocatesName><strong>for Petitioner: </strong><br>C.Subodh</br><strong>for Respondent: </strong><br>Asst.Public Prosecutor</div><hr style='height:2px;background-color:gray'><span>ORDER</span><!DOCTYPE html><html><head></head><body><p style=padding-left:13px;padding-right:13px;text-align:justify>In this Criminal Petition filed under Section 482 of the Code of Criminal Procedure, 1973 (for short \"Cr.P.C\") the petitioner/Accused seeks to quash the proceedings against him in C.C.No.117 of 2015 on the file of V Additional Judicial Magistrate of First Class, Nellore, for the offence under Section 420 IPC.&nbsp;</p><div class=\"jpara\" id=\"jpara-2\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>2. </strong>The private complaint filed by the 2<sup>nd</sup> respondent herein was referred to the Police by the learned V Additional Judicial Magistrate of First Class, Nellore, under Section 156 (3) Cr.P.C., which was registered as a case in Crime No.270 of 2014 by the IV Town Police Station, Nellore, for investigation and report.&nbsp;</p></div><div class=\"jpara\" id=\"jpara-3\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>3.</strong> The facts in issue are that the 2<sup>nd</sup> respondent/de facto complainant is doing crusher business in the name and style of 'Royal Stones'. The petitioner/Accused is the authorized agent to sell the properties of T.Uttam Reddy, who is the Proprietor of Deepaditya Developers Limited, Hyderabad, and he proposed to sell the land to an extent of Ac.1.08&frac12; cents in Sy.No.289 and Patta No.369 of Epuru Bit-1B, situated in Pantapalem village, Muthukur Mandal and Gudur Revenue Division. L.Ws.1 to 3, (K.Venkateswara Rao, Shaik Abdul, Thalluru Kusumakar) visited the proposed land and de facto complainant agreed to purchase the said land for a sale consideration of Rs.54.00 lakhs. On 22.11.2008, the petitioner/Accused executed an agreement of&nbsp; sale in favour of the 2<sup>nd</sup> respondent/de facto complainant/L.W.1 and received an advance amount of Rs.7.00 lakhs from him with a condition that he shall pay the balance amount within two months after measuring the land. The 2<sup>nd</sup> respondent requested the petitioner/accused to receive the balance amount and execute the sale deed in his favour. But, the petitioner/accused postponed and evaded to execute the regular sale deed. On an&nbsp; enquiry, the 2<sup>nd</sup> respondent came to know that the said property was sold away to third parties by the petitioner/accused for excess consideration and got registered. When the 2<sup>nd</sup> respondent requested the petitioner/accused to refund the advance amount, he did not give a proper reply and on the basis of the complaint of the 2<sup>nd</sup> respondent, a case in Crime No.270 of 2014 was registered by IV Town Police Station, Nellore, for the offence under Section 420 IPC, the crime was investigated and eventually having found prima facie evidence against the accused regarding his complicity in the commission of the said offence, the Investigating Officer has filed charge sheet in the trial Court. The said case is now pending before the trial Court. Questioning the same, the petitioner/accused filed the present criminal petition to quash the proceedings against him.</p></div><div class=\"jpara\" id=\"jpara-4\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>4.</strong> Heard Sri C.Subodh, learned counsel for the petitioner and learned Assistant Public Prosecutor for the State.</p></div><div class=\"jpara\" id=\"jpara-5\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>5.</strong> Fulminating the complaint allegations as false and motivated, the learned counsel for the petitioner/Accused would submit that the complaint allegations, even if, are accepted to be true, they would disclose the dispute as civil in nature. He further argued that if the petitioner/accused is not executed a sale deed in favour of the 2<sup>nd</sup> respondent, he ought to have issued a legal notice expressing his readiness and willingness on depositing the remaining amount in the Court. But, no notice was issued. Further, he would submit that the allegations in the complaint are purely civil in nature and the learned Magistrate ought not to have entertained the complaint and forwarded the same to the Police. He would further submit that the complainant is required to file a sworn affidavit in support of the complaint allegations as observed by the Hon'ble Apex Court in&nbsp; &nbsp;Priyanka Srivastava v. State of U.P.&nbsp; &nbsp;2015 (3) ALT (Crl.) 26 (SC) : (AIROnline 2015 SC 595), . In the instant case, since the complainant did not file any sworn affidavit, the learned Magistrate ought not to have forwarded the complaint to the Police for investigation. He, therefore, submitted that the continuation of criminal proceedings is nothing but an abuse of the process of the Court and thus, he prayed to quash the proceedings.</p></div><div class=\"jpara\" id=\"jpara-6\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>6.</strong> Learned Assistant Public Prosecutor vehemently opposed the criminal petition. He would submit that there are specific allegations made against the petitioner/accused, who offered to sell the property and received part of the sale consideration and failed to execute a regular sale deed. On an enquiry, the 2<sup>nd</sup> respondent came to know that the petitioner sold away the property to a third party for excess consideration, which clearly shows that, with a deceptive intention at the inception, he took the amount and failed to perform his part of the contract and it is a clear case of cheating. He would further submit that there are no merits in the contentions of the petitioner's counsel much less commission of the offence. Therefore, he would pray to dismiss the criminal petition.</p></div><div class=\"jpara\" id=\"jpara-7\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>7. </strong>Now the point for consideration is:</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify>Whether there are any merits in the criminal petition to allow?</p><p style=padding-left:13px;padding-right:13px;text-align:justify>POINT:</p><div class=\"jpara\" id=\"jpara-8\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>8.</strong> The above narration of events formed the basis that the petitioner/accused executed an agreement of sale on 22.11.2008&nbsp; in favour of the 2<sup>nd</sup> respondent in respect of the property to an extent of Ac.1.08&frac12; cents situated in Sy.No.289 of Pantapalem village. <span  title=\"Rule Marking Content\">On the date of the agreement of sale, the petitioner/accused received an amount of Rs.7.00 lakhs towards part of the sale consideration and agreed to execute the registered sale deed in favour of the 2<sup>nd</sup> respondent within two months after measuring the land. Thereafter, the petitioner/accused postponed the execution of the sale deed by receiving the balance sale consideration. In collusion, the petitioner/accused sold away the property to third parties for excess consideration. Admittedly, no notice was issued by the&nbsp; 2<sup>nd</sup> respondent to the petitioner/accused expressing his readiness and willingness to perform his part of the contract or even otherwise deposited the balance amount in the Court by filing a suit. But, the remedy is always available to the 2<sup>nd</sup> respondent to file a civil suit for recovery of the advance amount. In that view, even if the complaint allegations are taken into consideration as true and correct, one cannot conclude prima facie that the petitioner/accused has committed the offence. It is a cardinal principle that when the complaint allegations essentially disclose a civil dispute and not a criminal offence, the continuation of the criminal proceedings, would amount to abuse of process of the Court. Moreover, this Court has at innumerable instances expressed its disapproval for imparting criminal colour to a civil dispute made merely to take advantage of a relatively quick relief granted in a criminal case in contrast to a civil dispute. Such an exercise is nothing but an abuse of the process of law which must be discouraged in its entirety. </span></p></div><div class=\"jpara\" id=\"jpara-9\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>9. </strong>It should be noted that in a decision reported in&nbsp; &nbsp;<strong class=\"casereferred-edraft-0\">State of Haryana and others V. Ch.Bhajanlal and others</strong>, <strong class=\"casereferred-edraft-0\">AIR 1992 SC 604</strong>&nbsp; the Hon'ble Apex Court has laid down the following guidelines as to when the High Court can exercise its plenary powers under Section 482 Cr.P.C., to quash the proceedings to prevent the abuse of the process of the Court. They are,</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify><em>\"(1) where the allegations made in the First Information Report or the complaint, even if they are taken at their face value and accepted in their entirety do not prima facie constitute any offence or make out a case against the accused; </em></p><p style=padding-left:13px;padding-right:13px;text-align:justify><em>(2) where the allegations in the First Information Report and other materials, if any, accompanying the F.I.R. do not disclose a cognizable offence, justifying an investigation by police officers under Section 156(1) of the Code except under an order of a Magistrate within the purview of Section 155(2) of the Code;&nbsp; </em></p><p style=padding-left:13px;padding-right:13px;text-align:justify><em>(3) where the uncontroverted allegations made in the FIR or 'complaint and the evidence collected in support of the same do not disclose the commission of any offence and make out a case against the accused; </em></p><p style=padding-left:13px;padding-right:13px;text-align:justify><em>(4) where the allegations in the FIR do not constitute a cognizable offence but constitute only a non-cognizable offence, no investigation is permitted by a police officer without an order of a Magistrate as contemplated under Section 155(2) of the Code; </em></p><p style=padding-left:13px;padding-right:13px;text-align:justify><em>(5) where the allegations made in the FIR or complaint are so absurd and inherently improbable on the basis of which no prudent person can ever reach a just conclusion that there is sufficient ground for proceeding against the accused; </em></p><p style=padding-left:13px;padding-right:13px;text-align:justify><em>(6) where there is an express legal bar engrafted in any of the provisions of the Code or the concerned Act (under which a criminal proceeding is instituted) to the institution and continuance of the proceedings and/or where there is a specific provision in the Code or the concerned Act, providing efficacious redress for the grievance of the aggrieved party; </em></p><p style=padding-left:13px;padding-right:13px;text-align:justify><em>(7) where a criminal proceeding is manifestly attended with mala fide and/or where the proceeding is maliciously instituted with an ulterior motive for wreaking vengeance on the accused and with a view to spite him due to private and personal grudge.&nbsp;\"</em></p><div class=\"jpara\" id=\"jpara-10\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>10. </strong>As can be seen, the 1<sup>st</sup> guideline is to the effect that even if the allegations are taken at their face value and accepted in their entirety, do not prima facie constitute any offence, then the FIR can be quashed. In the instant case, the petitioner/accused offered to sell the property, on behalf of Deepaditya Developers Limited, who is the authorized agent of T.Uttam Reddy, who is the Proprietor of the said firm. <span  title=\"Rule Marking Content\">When he offered to sell the subject property, the 2<sup>nd</sup> respondent agreed to purchase the same for a total consideration of Rs.54.00 lakhs 10 and paid advance of Rs.7,00,000/- with a condition that the remaining consideration would be paid by him within two months from the date of agreement dated 22.11.2008, after measuring the property. But, there is no material on record to&nbsp; show that the 2<sup>nd</sup> respondent offered to pay the balance consideration and the petitioner/accused failed to execute the sale deed. No notice was given by the 2<sup>nd</sup> respondent/complainant to prove his bona fides. In such circumstances, a distinction must be made between a civil wrong and a criminal wrong. When disputes between the parties constitute only civil wrong and not a criminal wrong, the Courts would not permit a person to be harassed although no case for taking cognizance of the offence has been made out. Therefore, this Court is of the considered view that the matter appears to be civil in nature. When the petitioner failed to execute a sale deed after expiry of the stipulated period, the 2<sup>nd</sup> respondent would have issued a notice seeking refund of the amount or to file a suit. Therefore, it appears that there is no cheating or dishonest intention of the petitioner/accused and the present FIR is an abuse of process of law. It is a purely civil dispute and has been given colour of a criminal offence to wreak vengeance</span><span  title=\"Rule Marking Content\">against the petitioner/accused and it does not mean to the strict standard of proof to sustain the accusation.</span></p></div><div class=\"jpara\" id=\"jpara-11\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>11. </strong>At this juncture, it is relevant to refer the Judgment in <strong class=\"casereferred-edraft-0\">Mohammad Ibrahim and others v. State of Bihar and another</strong>&nbsp;<strong class=\"casereferred-edraft-0\">2009 (8) SCC 751</strong> : (<strong class=\"casereferred-edraft-0\">AIR 2010 SC (Supp) 347</strong>) the Hon'ble Apex Court has held as under:</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify>\"This Court has time and again drawn attention to the growing tendency of complainants attempting to give the cloak of a criminal offence to matters which are essentially and purely civil in nature, obviously either to apply pressure on the accused, or out of enmity towards the accused, or to subject the accused to harassment. Criminal courts should ensure that proceedings before it are not used for settling scores or to pressurise parties to settle civil disputes.....\"</p><div class=\"jpara\" id=\"jpara-12\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>12. </strong>Another decision reported <strong class=\"casereferred-edraft-0\">Mitesh Kumar J. Sha v. State of Karnataka and others 2021 SCC Online SC 976</strong> : (<strong class=\"casereferred-edraft-0\">AIR 2021 SC 5298</strong>) the Hon'ble Apex Court has held as under:</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify>\"\"41. Having considered the relevant arguments of the parties and decisions of this court we are of the considered view that existence of dishonest or fraudulent intention has not been made out against the Appellants. Though the instant dispute certainly involves determination of issues which are of civil nature, pursuant to which Respondent No. 2 has even instituted multiple civil suits, one can by no means stretch the dispute to an extent, so as to impart it a criminal colour. As has been rightly emphasised upon by this&nbsp;court, by way of an observation rendered in the case of <strong class=\"casereferred-edraft-0\">M/s. Indian Oil Corporation v. M/s. NEPC India Ltd and Ors&nbsp; (AIR 2006 SC 2780)</strong> , as under :-</p><p style=padding-left:13px;padding-right:13px;text-align:justify>\"14. While no one with a legitimate cause or grievance should be prevented from seeking remedies available in criminal law, a complainant who initiates or persists with a prosecution, being fully aware that the criminal proceedings are unwarranted and his remedy lies only in civil law, should himself be made accountable, at the end of such misconceived criminal proceedings, in accordance with law.\"</p><p style=padding-left:13px;padding-right:13px;text-align:justify>42. It was also observed:-</p><p style=padding-left:13px;padding-right:13px;text-align:justify>\"13. While on this issue, it is necessary to take notice of a growing tendency in business circles to convert purely civil disputes into criminal cases. This is obviously on account of a prevalent impression that civil law remedies are time consuming and do not adequately protect the interests of lenders/creditors....There is also an impression that if a person could somehow be entangled in a criminal prosecution, there is a likelihood of imminent settlement. Any effort to settle civil disputes and claims, which do not involve any criminal offence, by applying pressure though criminal prosecution should be deprecated and discouraged.\"\"</p><div class=\"jpara\" id=\"jpara-13\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>13.</strong><strong class=\"casereferred-edraft-0\">Paramjeet Batra v. State of Uttarakhand and others</strong><strong class=\"casereferred-edraft-0\">2013 (11) SCC 763</strong> : (<strong class=\"casereferred-edraft-0\">AIROnline 2012 SC 724</strong>) the Hon'ble Apex Court has held as under:</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify>\"7. While exercising its jurisdiction under Section 482 of the Code the High Court has to be cautious. This power is to be used sparingly and only for the purpose of preventing abuse of the process of any court or otherwise to secure ends of justice. Whether a complaint discloses a criminal offence or not depends upon the nature of facts alleged therein. Whether essential ingredients of criminal offence&nbsp;are present or not has to be judged by the High Court. A complaint disclosing civil transactions may also have a criminal texture. But the High Court must see whether a dispute which is essentially of a civil nature is given a cloak of criminal offence. In such a situation, if a civil remedy is available and is, in fact, adopted as has happened in this case, the High Court should not hesitate to quash criminal proceedings to prevent abuse of process of court.\"</p><div class=\"jpara\" id=\"jpara-14\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>14.</strong> In the light of the above decisions, <span  title=\"Rule Marking Content\">it is true that the given set of facts may make out a civil wrong but not a criminal wrong. Hence, this Court is of the view that the complaint does not disclose any criminal offence at all. The criminal proceedings should not be encouraged when it is found to be mala fide or otherwise, an abuse of the process of the Court and does not meet the strict standard of proof required to sustain a criminal accusation.</span></p></div><div class=\"jpara\" id=\"jpara-15\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>15. </strong>The complainant is required to file a sworn affidavit in support of the complaint allegations as observed by the Hon'ble Apex Court in <strong class=\"casereferred-edraft-0\">Priyanka Srivastava's case: (AIROnline 2015 SC 595)(supra)</strong>. In the instant case,<span  title=\"Rule Marking Content\"> since the complainant did not file his sworn affidavit, the learned Magistrate ought not to have forwarded the complaint to the Police</span>, but in a routine manner in which the complaint has been referred to the Police for investigation and failed to notice mandate in <strong class=\"casereferred-edraft-0\">Priyanka Srivastava's case&nbsp;&nbsp;&nbsp;(AIROnline 2015 SC 595) (supra)</strong>. This Court has come to a conclusion that the continuation of the criminal proceedings against the petitioners would amount to an abuse of the process of law.</p></div><div class=\"jpara\" id=\"jpara-16\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>16. </strong>In another decision reported in <strong class=\"casereferred-edraft-0\">Vesa Holdings P.Ltd. and Anr.&nbsp; v. State Kerala and Ors.</strong>&nbsp;<strong class=\"casereferred-edraft-0\"><strong class=\"casereferred-edraft-0\">2015 (8) SCC 293</strong></strong>: (<strong class=\"casereferred-edraft-0\">AIR 2015 SC (Supp) 1085</strong>), the Hon'ble Apex Court held as follows:</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify>\"It is true that a given set of facts may make out a civil wrong as also a criminal offence and only because a civil remedy may be available to the complainant that itself cannot be a ground to quash a criminal proceeding. The real test is whether the allegations in the complaint disclose the criminal offence of cheating or not. In the present case there is nothing to show that at the very inception there was any intention on behalf of the accused persons to cheat which is a condition precedent for an offence under Section 420 IPC. In our view the complaint does not disclose any criminal offence at all. Criminal proceedings should not be encouraged when it is found to be malafide or otherwise an abuse of the process of the court. Superior courts while exercising this power should also strive to serve the ends of justice. In our opinion, in view of these facts allowing the police investigation to continue would amount to an abuse of the process of court and the High Court committed an error in refusing to exercise the power under Section 482 Criminal Procedure Code to quash the proceedings.\"&nbsp;</p><div class=\"jpara\" id=\"jpara-17\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>17. </strong>Applying the above principles laid down in Hon'ble Apex Court's judgments, this dictum to the instant factual matrix, it can be safely concluded that the present case clearly falls within the ambit of the guidelines of <strong class=\"casereferred-edraft-0\">Bhajanlal's case</strong>&nbsp;<strong class=\"casereferred-edraft-0\">AIR 1992 SC 604</strong> (supra) and therefore, warrants interference of this Court. In the backdrop of the discussion that went on, this Court is of the view that inherent powers under Section 482 Cr.P.C, are liable to be invoked to quash the proceedings. It is found that the criminal proceedings are maliciously instituted with an ulterior motive to settle the civil disputes.</p></div><div class=\"jpara\" id=\"jpara-18\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>18. </strong>Therefore, this Court is of the view that continuation of criminal proceedings against the petitioner/accused is undesirable and the proceedings are liable to be quashed.</p></div><div class=\"jpara\" id=\"jpara-19\"><p style=padding-left:5px;padding-right:5px;text-align:justify><strong>19.</strong> Resultantly, the Criminal Petition is allowed. The criminal proceedings against the petitioner/accused in C.C.No.117 of 2015 on the file of the Court of V Additional Judicial Magistrate of First Class, Nellore, for the offence punishable under Section 420 IPC, are hereby quashed.</p></div><p style=padding-left:13px;padding-right:13px;text-align:justify>As a sequel, the miscellaneous petitions, pending if any, shall stand disposed of.</p></body></html></p><p style=padding-left:13px;padding-right:13px;text-align:justify></p><p style=padding-left:13px;padding-right:13px;text-align:justify></p><p style=padding-left:13px;padding-right:13px;text-align:justify></p></br>";

    useEffect(() => {
        const showJudgement = async () => {
            response = await getjudgement(citationID);
            console.log("judgement Response", response);

            if (response.err_code === "success") {
                setEqualCitation(response.equalCitation);
                setJudgement(response.content.replace(/<html>|<\/html>/g, '')
                    .replace(/<body>|<\/body>/g, '')
                    .replace(/\n/g, '')
                    .trim());
            } else {
                setJudgement("No data found for citation")
            }

        }

        showJudgement();
        // setJudgement(staticResponse.replace(/<html>|<\/html>/g, '')
        //     .replace(/<body>|<\/body>/g, '')
        //     .replace(/\n/g, '')
        //     .trim());


    }, []);

    // const customHTMLElementModels = {
    //     h2: {
    //         validAttributes: {},
    //         render: (htmlNode, children) => {
    //             return (
    //                 <Text style={styles.customHeading}>{children || ''}</Text>
    //             );
    //         },
    //     },
    // };


    // setJudgement(staticResponse);

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    const handleLinkPress = () => {
        scrollViewRef.current?.scrollTo({
            y: 500, // Adjust based on the position of jpara-3
            animated: true,
        });
    };

    const scrollToParagraph = () => {
        paragraphRef.current?.measureLayout(
            scrollViewRef.current,
            (x, y) => {
                // Scroll to the exact position of the paragraph
                scrollViewRef.current?.scrollTo({ y, animated: true });
            },
            (error) => console.error('Failed to measure layout', error)
        );
    };

    const renderersProps = {
        a: {
            onPress: (_, attribs) => {
                console.log("jpara", attribs);
                const result = attribs.includes('#') ? attribs.split('#')[1] : null;
                console.log('#' + result);
                if (result) {
                    console.log("Link log", result);
                    // handleLinkPress();
                }
            },
        },
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={globalstyle.safearea}>

            <View>
                <View >
                    {equalCitation[0] === citationName ? null : <Button style={{
                        alignSelf: "flex-end", marginVertical: 5,
                    }}
                        // icon="camera" 
                        mode="contained" onPress={openModal}>
                        Equal Citation
                    </Button>

                    }
                </View>
                <ScrollView ref={scrollViewRef}>

                    <View style={styles.container}>
                        <Image style={{
                            width: 100,
                            height: 100, alignSelf: 'center'
                        }} source={require('../../assets/images/AIR-Logo-Black-New.png')} />

                        <RenderHTML
                            contentWidth={width}
                            source={{ html: judgement }}
                            tagsStyles={tagsStyles}
                            classesStyles={classesStyles}
                            // renderersProps={{ a: { renderersProps } }}
                            renderersProps={renderersProps}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal} // For Android back button
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <View>
                                        <Text style={styles.modalTitle}>Select an Item</Text>
                                    </View>
                                    <FlatList
                                        data={equalCitation}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.itemContainer}>
                                                <Text style={styles.itemText}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />

                                    <Button title="Close Modal" style={{ backgroundColor: theme.colors.primary, alignSelf: "flex-end", marginVertical: 5, color: 'white' }} onPress={closeModal} />
                                </View>
                            </View>
                        </Modal>

                    </View>

                </ScrollView>
                <FAB
                    icon="arrow-up"
                    style={styles.fab}
                    onPress={scrollToTop}
                />
            </View>
        </SafeAreaView>
    );
}
const tagsStyles = {
    'div': {
        padding: 0,
    },
    'h5': {
        fontSize: 15
    },
    'h6': {
        fontSize: 14,
    },
    'p': {
        textAlign: 'justify'
    },
    'span': {
        fontSize: 15,
        // textFontSize: { fontSize: width / 15 },

        fontWeight: 'bold'
    }

};

const classesStyles = {
    centerContainer: {
        textAlign: "center",
        fontWeight: '600',
        lineHeight: 25,
    },
    citation: {
        fontSize: 22
    },
    advocatesName: {
        // fontWeight: 'bold',
        // textTransform: 'capitalize'
    },
    dod: {
        fontWeight: '500',
        // textTransform: 'capitalize'
    },
    refferedCase: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    ref_heading: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    refferdCit: {
        flex: 1
    },
    headNote: {
        textAlign: 'justify',
        fontFamily: 'Signika-SemiBold'
    },
    partyName: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    caseResult: {
        textAlign: 'right',
    },
    judgesName: {
        textTransform: 'uppercase'
    },
    // judgesCount: {
    //     marginLeft:25
    // }
};
const styles = StyleSheet.create({

    safearea: {
        flex: 1,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "#F8F6F4",
        marginTop: 5

    },
    customHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    // itemContainer: {
    //     padding: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    // },
    itemText: {
        fontSize: 16,

    },
    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',

        borderRadius: 10,
        alignItems: 'center',
        maxHeight: '70%', // Limit height for FlatList scrolling
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,

    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',

    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 25,
    },
    containerStyle: { backgroundColor: 'white', padding: 20 },
    
}) 