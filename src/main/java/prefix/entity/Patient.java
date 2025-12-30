package prefix.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import prefix.entity.gender.GenderType;
import prefix.entity.prefixType.PrefixTypes;
import prefix.entity.titleType.TitleType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DOB")
    @Temporal(TemporalType.DATE)
    private Date dob;

    @Column(name = "GENDER")
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Column(name = "PREFIX_NAME")
    @Enumerated(EnumType.STRING)
    private PrefixTypes prefix;

    // This fixed the error
    public String getDisplayPrefix() {
        if (prefix != null) {
            return prefix.getDisplayValue();
        }
        return "";
    }

    @Column(name = "TITLE")
    @Enumerated(EnumType.STRING)
    private TitleType title;

    public String getDisplayTitle() {
        if(title != null) {
            return title.getDisplayValue();
        }
        return "";
    }
}













