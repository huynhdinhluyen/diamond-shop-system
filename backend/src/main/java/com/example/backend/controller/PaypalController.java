package com.example.backend.controller;

import com.example.backend.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PaypalController {
    //private static final Logger log = LoggerFactory.getLogger(PaypalController.class);
    private final PaypalService paypalService;

    @GetMapping("/api/home")
    public String home(){
        return "index";
    }

    ///api/payment/create

    @PostMapping("/api/payment/create")
    public RedirectView createPayment(){
        try{
            String cancelUrl = "http://localhost:8080/api/payment/cancel";
            String successUrl = "http://localhost:8080/api/payment/success";
            Payment payment = paypalService.CreatePayment(
                    10.0,
                    "USD",
                    "paypal",
                    "sale",
                    "des for payment",
                    cancelUrl,
                    successUrl
            );
            for (Links links : payment.getLinks()){
                if (links.getRel().equals("approval_url")){
                    return new RedirectView(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            log.error("PayPal REST Exception", e);
        }
        return new RedirectView("/api/payment/error");
    }

    @GetMapping("/api/payment/success")
    public String paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId
    ){
        try {
            Payment payment = paypalService.GetPayment(paymentId, payerId);
            if (payment.getState().equals("approved")){
                return "paymentSuccess";
            }
        } catch (PayPalRESTException e){
            log.error("PayPal REST Exception", e);
        }
        return "paymentSuccess";
    }

    @GetMapping("/api/payment/cancel")
    public String paymentCancel(){
        return "paymentCancel";
    }

    @GetMapping("/api/payment/error")
    public String paymentError(){
        return "paymentError";
    }




}
